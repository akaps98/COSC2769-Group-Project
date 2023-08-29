import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductUpdate from "./ProductUpdate";
import Axios from 'axios';
import ProductTableHead from "./ProductTableHead";
import Statistics from "./Statistics";

function ProductManage({ seller }) {
    Axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([]);
    const loadProducts = () => {
        Axios.post('http://localhost:3001/seller/allProducts', {SellerID: seller})
            .then((response) => {setProducts(response.data)})
            .catch(() => {console.log('error')});
    }
    useEffect(() => {
        loadProducts()
    }, []);

    const columns = [
        { label: "ID", accessor: "id", sortable: false },
        { label: "Image", accessor: "image", sortable: false },
        { label: "Name", accessor: "name", sortable: true },
        { label: "Price", accessor: "price", sortable: true },
        { label: "Category", accessor: "category", sortable: false },
        { label: "Quantity", accessor: "quantity", sortable: false },
        { label: "Date Added", accessor: "dateAdded", sortable: true },
        { label: "Manage", accessor: "manage", sortable: false }
    ];
    const [sortingOption, setSortingOption] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    function handleSorting(accessor) {
        const newSortOrder = accessor === sortingOption && sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newSortOrder);
        setSortingOption(accessor);
        sortTable(accessor, newSortOrder);
    }
    function sortTable(accessor, order) {
        switch (accessor) {
            case "name":
                if (order === "desc") {
                    const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name)).reverse();
                    setProducts(sortedProducts);
                } else {
                    const sortedProducts = products.sort((a, b) => a.name.localeCompare(b.name));
                    setProducts(sortedProducts);
                };
                break;
            case "price":
                if (order === "desc") {
                    const sortedProducts = products.sort((a, b) => a.price - b.price).reverse();
                    setProducts(sortedProducts);
                } else {
                    const sortedProducts = products.sort((a, b) => a.price - b.price);
                    setProducts(sortedProducts);
                };
                break;
            case "dateAdded":
                if (order === "desc") {
                    const sortedProducts = products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                    setProducts(sortedProducts);
                } else {
                    const sortedProducts = products.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)).reverse();
                    setProducts(sortedProducts);
                };
                break;
            default:
                break;

        }
    }

    const [product, setProduct] = useState({});

    const [deleteModalshow, setDeleteModalShow] = useState(false);
    const handleDeleteModalClose = () => setDeleteModalShow(false);
    const handleDeleteModalShow = () => setDeleteModalShow(true);
    
    const [updateModalshow, setUpdateModalShow] = useState(false);
    const handleUpdateModalClose = () => setUpdateModalShow(false);
    const handleUpdateModalShow = () => setUpdateModalShow(true);

    function handleUpdate(e){
        const { value } = e.target;
        const p = products.filter(product => {
            return product.ProductID === parseInt(value);
        });
        setProduct(...p);
        handleUpdateModalShow();
    };

    function handleDelete(e){
        const { value } = e.target;
        const p = products.filter(product => {
            return product.ProductID === parseInt(value);
        })
        setProduct(...p);
        handleDeleteModalShow();
    }

    const deleteProduct = () => {
        Axios.post('http://localhost:3001/seller/deleteProduct', {
            id: product.ProductID,
        }).then((response) => {
            if (response.data.message) {
                alert(JSON.stringify(response.data.message));
                loadProducts();
                handleDeleteModalClose();
            } else {
                alert("ProductManage.js_deleteProduct:",JSON.stringify(response.data)); 
            }
        });
    }

    return (
        <>
            <Statistics seller={seller}/>
            <div className="management-container">
                <Modal show={deleteModalshow} onHide={handleDeleteModalClose} animation={false} centered>
                    <Modal.Header>
                        <Modal.Title>Delete Product ID #{product.ProductID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to delete the product: {product.name} ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={() => {
                            deleteProduct();
                            handleDeleteModalClose();
                        }}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={handleDeleteModalClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ProductUpdate handleClose={handleUpdateModalClose} show={updateModalshow} p={product} key={product.ProductID} reload={loadProducts}/>
                <div className="management-title-container">
                    <p className="management-title">Product Management</p>
                    <Link to={"/seller/addProduct"} className="add-btn">Add Product</Link>
                </div>
                <table className="product-table">
                <thead>
                        <ProductTableHead
                            columns={columns}
                            handleSorting={handleSorting}
                            sortOrder={sortOrder}
                            sortingOption={sortingOption}
                        />
                    </thead>
                    <tbody>
                        {products.map((product) => {
                            return (
                                <tr key={product.ProductID}>
                                    <td className="col-sm-2">{product.ProductID}</td>
                                    {/* imagePath format = "../assets/images/products/..." */}
                                    {/* src={require("../../assets/images/products/3.png") works */}
                                    {/* src={require("../"+product.imagePath)} doesn't work with variable...T-T */}
                                    <td className="col-sm-2"><img src={"../"+product.imagePath}  alt={product.ProductID} /></td>
                                    <td className="col-sm-2">{product.name}</td>
                                    <td className="col-sm-2">{product.price.toLocaleString() + " ₫"}</td>
                                    <td className="col-sm-2">{JSON.parse(product.category).join(' > ')}</td>
                                    <td className="col-sm-2">{product.quantity}</td>
                                    <td className="col-sm-2">{product.dateAdded.slice(0,10)}</td>
                                    <td className="col-sm-2">
                                        <button className="product-update-btn" value={product.ProductID} onClick={handleUpdate}/>
                                        <button className="product-delete-btn" value={product.ProductID} onClick={handleDelete}/>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductManage;
