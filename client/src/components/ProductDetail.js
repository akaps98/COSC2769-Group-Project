import React, { useCallback, useEffect, useState } from "react";
import Axios from 'axios'
import { useLocation } from 'react-router-dom'
import productImg from "../assets/images/products/iPhone14.png";
import guaranteed from "../assets/images/guaranteed.png";
import heart from "../assets/images/heart.png"

function ProductDetail({ user, userType }) {
    const product = useLocation().state.data;
    const category = Array((JSON.parse(product.category.split(","))));
    const [ quantity, setQuantity ] = useState(1);
    const [ shoppingCart, setShoppingCart] = useState([]);
    const [ isWrapped, setIsWrapped ] = useState(true);

    useEffect(() => {
        Axios.post('http://localhost:3001/shoppingCart/findShoppingCart', {
            id: user.CustomerID
        }).then((response) => {
            setShoppingCart(response.data);
        })
    }, [])

    function handleClick(){
        setIsWrapped(prev => !prev);
    }

    function saveProduct() {
        if(userType !== "") { // member
            Axios.post('http://localhost:3001/shoppingCart/updateShoppingCart', {
                quantity: quantity,
                productID: product.ProductID,
                customerID: user.CustomerID
            }).then((response) => {
                console.log(response);
            });
        } 
        if(localStorage.getItem(product.ProductID) == null) {
            localStorage.setItem(product.ProductID, quantity);
        } else {
            // const newQuantity = JSON.parse(localStorage.getItem(product.ProductID)) + quantity;
            localStorage.setItem(product.ProductID, quantity);
        }
        alert("Successfully added on shopping cart!");
        //window.location.reload();
    }

    function removeProduct() {
        if(userType !== "") { // member
            Axios.post('http://localhost:3001/shoppingCart/removeShoppingCart', {
                productID: product.ProductID,
                customerID: user.CustomerID
            }).then((response) => {
                console.log(response);
            });
        } 
        if(localStorage.getItem(product.ProductID) != null) {
            localStorage.removeItem(product.ProductID);
        }
        alert("Successfully removed on shopping cart!");
        //window.location.reload();
    }
    return (
        <>
            <div className="product-detail-container">
                <div className="img-container">
                    <img className="product-img" src={`http://localhost:3001/${product.imagePath}`} alt="" />
                </div>
                <div className="product-main-container">
                    <h2 className="pName">{product.name}</h2>
                    {/* <p className="stars" style={{ "--rating": rating }}>1490 Ratings</p> */}
                    {category.map(name => <p key = {name} className="text-muted category-text">{name + ''}</p>)}
                    <div className="hr-line"></div>
                    <p className="price">{product.price.toLocaleString()}</p>
                    {/* <div className="qty-container">
                        <p className="text-secondary pt-1">Quantity</p>
                        <button className="qty-btn" onClick={() => {
                            if(quantity != 1) {
                                setQuantity(quantity - 1)
                            }
                        }}>-</button>
                        <input type="text" className="quantity" value={quantity} readOnly/>
                        <button className="qty-btn" onClick={() => {setQuantity(quantity + 1);}}>+</button>
                        <p className="text-secondary stock">{product.quantity} available</p>
                    </div> */}
                    <div className="btn-container">
                        <button className="toCart-btn" onClick={saveProduct}>Add to Cart</button>
                        <button className="toCart-btn" onClick={removeProduct}>Remove on Cart</button>
                    </div>
                </div>
                <div className="product-sub-container">
                    <div className="shipping-info-container">
                        <p className="text-secondary section-title">Delivery options</p>
                        <div className="location-img">
                            <p className="shipping-address">Hồ Chí Minh, Quận 1, Phường Phạm Ngũ Lão</p>
                        </div>
                        <div className="cod-container">
                            <p className="cod-text-container">Cash on Delivery Available<br />(No mutual check)</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-secondary section-title">Return & Warranty</p>
                        <div className="warranty-container">
                            <p><img src={guaranteed} alt="" />100% Authentic</p>
                            <p><img src={heart} alt="" />Change of Mind</p>
                            <p><img src={guaranteed} alt="" />15 Days Return</p>
                        </div>
                    </div>
                    <div className="seller-name-container">
                        <p className="text-secondary section-title">Sold By</p>
                        <p className="seller-name">Seller {product.SellerID}</p>
                    </div>
                </div>
            </div>
            <div className="product-desc-container">
                <p className="desc-title">Product description for product name</p>
                <p className={isWrapped && "product-desc"}>
                    {product.description}
                </p>
                <div className="wrap-toggle-btn-container">
                    <button className="wrap-toggle-btn" onClick={handleClick}>{isWrapped ? "VIEW MORE" : "VIEW LESS"}</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;