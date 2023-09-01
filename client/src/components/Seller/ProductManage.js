import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductUpdate from "./ProductUpdate";
import Axios from 'axios';
import ProductTableHead from "./ProductTableHead";

import search from "../../assets/images/sellers/search-interface-symbol.png";

function ProductManage({ seller }) {
    Axios.defaults.withCredentials = true;

    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const loadProducts = () => {
        Axios.post('http://localhost:3001/seller/allProducts', {SellerID: seller})
            .then((response) => {setProducts(response.data); setAllProducts(response.data) })
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
    const [pName, setPName] = useState("");
    const handleNameChange = (e) => setPName(e.target.value);
    const [pDate, setPDate] = useState({ fromDate: "", toDate: "" });
    const [pPrice, setPPrice] = useState({ fromPrice: 0, toPrice: 0 });

    function handleDateChange(e) {
        const { name, value } = e.target;
        setPDate((prev) => {
            return (
                {
                    ...prev,
                    [name]: value
                }
            )
        });
        console.log(pDate);
    }

    function handlePriceChange(e) {
        const { name, value } = e.target;
        setPPrice((prev) => {
            return (
                {
                    ...prev,
                    [name]: parseInt(value)
                }
            )
        });
        console.log(pPrice);
    }

    function filterProducts() {
        const newProducts = [...allProducts];
        const filteredProducts = newProducts.filter(product => {
            if (pName !== "") {
                const name = pName.toLowerCase();
                if (!product.name.toLowerCase().includes(name)) {
                    return false;
                }
            }
            if (pDate.fromDate !== "" && pDate.toDate !== "") {
                if (!(new Date(pDate.fromDate) <= new Date(product.dateAdded.slice(0, 10)))
                    || !(new Date(product.dateAdded.slice(0, 10)) <= new Date(pDate.toDate))) {
                    return false;
                }
            }else if (pDate.fromDate !== "" || pDate.toDate !== "") {
                if (pDate.fromDate !== "") {
                    if(!(new Date(pDate.fromDate) <= new Date(product.dateAdded.slice(0, 10)))){
                        return false;
                    }
                } else {
                    if (!(new Date(product.dateAdded.slice(0, 10)) <= new Date(pDate.toDate))){
                        return false;
                    }
                }
            }
            if (pPrice.fromPrice !== 0 && pPrice.toPrice !== 0) {
                if (!(pPrice.fromPrice <= product.price) || !(product.price <= pPrice.toPrice)){
                    return false;
                }
            } else if (pPrice.fromPrice !== 0 || pPrice.toPrice !== 0) {
                if (pPrice.fromPrice !== 0) {
                    if (!(pPrice.fromPrice <= product.price)){
                        return false
                    }
                } else {
                    if (!(pPrice.toPrice >= product.price)){
                        return false;
                    }
                }
            }
            return true;
        });
        setProducts(filteredProducts);
        console.log(filteredProducts);
        console.log(pDate);
        console.log(pPrice);
    }

    function handleFilterClear() {
        setPDate({ fromDate: "", toDate: "" });
        setPPrice({ fromPrice: 0, toPrice: 0 });
    }


    const [deleteModalshow, setDeleteModalShow] = useState(false);
    const handleDeleteModalClose = () => setDeleteModalShow(false);
    const handleDeleteModalShow = () => setDeleteModalShow(true);
    
    const [updateModalshow, setUpdateModalShow] = useState(false);
    const handleUpdateModalClose = () => setUpdateModalShow(false);
    const handleUpdateModalShow = () => setUpdateModalShow(true);

    const [filterShow, setFilterShow] = useState(false);
    const handleFilterClose = () => setFilterShow(false);
    const handleFilterToggle = () => setFilterShow((prev) => !prev);

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
                console.log("ProductManage.js:",err); 
            }
        });
    }

    return (
        <>
            <div className="product-management-container">
                <Modal show={deleteModalshow} onHide={handleDeleteModalClose} animation={false} centered>
                    <Modal.Header>
                        <Modal.Title>Delete Product ID #{product.ProductID}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to delete the product: {product.name} ?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger close-btn" onClick={() => {
                            deleteProduct();
                            handleDeleteModalClose();
                        }}>
                            Delete
                        </Button>
                        <Button variant="secondary close-btn" onClick={handleDeleteModalClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ProductUpdate handleCloseModal={handleUpdateModalClose} show={updateModalshow} p={product} key={product.ProductID} reload={loadProducts}/>
                <div className="management-title-container">
                    <p className="management-title">Product Management</p>
                    <Link to={"/seller/addProduct"} className="add-btn">Add Product</Link>
                </div>

                <div className="product-filter-container my-3">
                    <button className="product-search-btn" onClick={filterProducts}><img src={search} alt="" /></button>
                    <input type="text" placeholder="Search..." className="product-name-filter-input" onChange={(e) => handleNameChange(e)} />
                    <button className={filterShow ? "product-filter-btn filter-btn-active" : "product-filter-btn"}
                        onClick={handleFilterToggle}>
                        Filter
                    </button>
                    {filterShow &&
                        <div className="product-filter-form-container mt-3 text-secondary">
                            <div className="product-date-filter-container">
                                Date <input type="date" className="col-sm-4 ms-4" name="fromDate" onChange={(e) => handleDateChange(e)} value={pDate.fromDate} /> - <input type="date" className="col-sm-4" name="toDate" value={pDate.toDate} onChange={(e) => handleDateChange(e)} />
                            </div>
                            <div className="hr-line my-3" />
                            <div className="product-price-filter-container">
                                Price <input type="number" className="col-sm-4 ms-4" placeholder="20000" name="fromPrice" onChange={(e) => handlePriceChange(e)} value={pPrice.fromPrice} /> - <input type="number" className="col-sm-4" placeholder="100000" value={pPrice.toPrice} name="toPrice" onChange={(e) => handlePriceChange(e)} />
                            </div>
                            <div className="hr-line my-3" />
                            <div className="product-filter-footer">
                                <button className="text-danger" onClick={handleFilterClear}>Clear all filter</button>
                                <div>
                                    <button className="text-secondary" onClick={handleFilterClose}>Close</button>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <table className="management-table">
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
                                    <td className="col-sm-2"><img src={`http://localhost:3001/${product.imagePath}`}  alt={product.ProductID} /></td>
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