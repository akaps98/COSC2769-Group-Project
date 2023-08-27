import React, { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import productImg from "../../assets/images/products/iPhone14.png";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductUpdate from "./ProductUpdate";
import ProductTableHead from "./ProductTableHead";
import Statistics from "./Statistics";

function ProductManage() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const now = date.getFullYear() + "-" + (month > 9 ? month : "0" + month) + "-" + date.getDate();
    const columns = [
        { label: "Image", accessor: "image", sortable: false },
        { label: "Name", accessor: "name", sortable: true },
        { label: "Price", accessor: "price", sortable: true },
        { label: "Category", accessor: "category", sortable: false },
        { label: "Date Added", accessor: "dateAdded", sortable: true },
        { label: "Manage", accessor: "manage", sortable: false }
    ];
    const [sortingOption, setSortingOption] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [products, setProducts] = useState([
        { id: 1, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 2, name: "aPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: "2023-08-21", image: productImg, description: "iPhone14" },
        { id: 3, name: "bPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: "2023-08-20", image: productImg, description: "iPhone14" },
        { id: 4, name: "cPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: "2020-08-21", image: productImg, description: "iPhone14" },
        { id: 5, name: "iPhone 13 pro", price: 10000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 6, name: "iPhone 12 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 7, name: "iPhone 11 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 8, name: "Galaxy S23", price: 28000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 9, name: "iPhone 14 pro", price: 29000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 10, name: "iPhone 14 pro", price: 17000000, category: "Health", dateAdded: now, image: productImg, description: "iPhone14" }
    ]);
    const [product, setProduct] = useState({
        id: 0,
        name: "",
        price: 0,
        category: "",
        dateAdded: now,
        image: ""
    })
    function deleteProduct() {
        const newProducts = products.filter(product => {
            return product.id !== productId;
        });
        setProducts(newProducts);
    }
    function getProduct(id) {
        const p = products.filter(product => {
            return product.id === id;
        })
        setProduct(...p);
        handleUpdateModalShow();
    }
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
    const [deleteModalshow, setDeleteModalShow] = useState(false);
    const [productId, setProductId] = useState(0);
    const handleDeleteModalClose = () => setDeleteModalShow(false);
    const handleDeleteModalShow = () => setDeleteModalShow(true);
    const [updateModalshow, setUpdateModalShow] = useState(false);
    const handleUpdateModalClose = () => setUpdateModalShow(false);
    const handleUpdateModalShow = () => setUpdateModalShow(true);
    return (
        <>
            <Statistics />
            <div className="management-container">
                <Modal show={deleteModalshow} onHide={handleDeleteModalClose} animation={false} centered>
                    <Modal.Header>
                        <Modal.Title>Delete Product</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you really want to delete a product?</Modal.Body>
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
                <ProductUpdate handleClose={handleUpdateModalClose} show={updateModalshow} product={product} setProduct={setProduct} />
                <div className="management-title-container">
                    <p className="management-title">Product Management</p>
                    <Link to={"/addProduct"} className="add-btn">Add Product</Link>
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
                                <ProductTableRow product={product}
                                    key={product.id}
                                    handleDeleteModalShow={handleDeleteModalShow}
                                    setProductId={setProductId}
                                    getProduct={getProduct}
                                />
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ProductManage;