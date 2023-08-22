import React, { useState } from "react";
import ProductTableRow from "./ProductTableRow";
import productImg from "../../assets/images/iPhone14.png";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProductUpdate from "./ProductUpdate";

function ProductManage() {
    const date = new Date();
    const now = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    const [products, setProducts] = useState([
        { id: 1, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 2, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 3, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 4, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 5, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 6, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 7, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 8, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 9, name: "iPhone 14 pro", price: 20000000, category: "Electronics", dateAdded: now, image: productImg, description: "iPhone14" },
        { id: 10, name: "iPhone 14 pro", price: 20000000, category: "Health", dateAdded: now, image: productImg, description: "iPhone14" }
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
    const [deleteModalshow, setDeleteModalShow] = useState(false);
    const [productId, setProductId] = useState(0);
    const handleDeleteModalClose = () => setDeleteModalShow(false);
    const handleDeleteModalShow = () => setDeleteModalShow(true);
    const [updateeModalshow, setUpdateModalShow] = useState(false);
    const handleUpdateModalClose = () => setUpdateModalShow(false);
    const handleUpdateModalShow = () => setUpdateModalShow(true);
    return (
        <div className="product-management-container">
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
            <ProductUpdate handleClose={handleUpdateModalClose} show={updateeModalshow} product={product} setProduct={setProduct}/>
            <div className="product-management-title-container">
                <p className="product-management-title">Product Management</p>
                <Link to={"/addProduct"} className="add-btn">Add Product</Link>
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Categories</th>
                        <th>Date Added</th>
                        <th>Manage</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => {
                        return (
                            <ProductTableRow product={product}
                                key={product.id}
                                delete={handleDeleteModalShow}
                                pID={setProductId}
                                getProduct={getProduct}
                            />
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default ProductManage;