import React, { useCallback, useEffect, useState } from "react";
import Axios from 'axios'
import { useLocation } from 'react-router-dom'
import guaranteed from "../../assets/images/guaranteed.png";
import heart from "../../assets/images/heart.png"

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
            localStorage.setItem(product.ProductID, quantity);
        }
        alert("Successfully added on shopping cart!");
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
    }
    return (
        <>
            <div className="product-detail-container">
                <div className="img-container">
                    <img className="product-img" src={`http://localhost:3001/${product.imagePath}`} alt="" />
                </div>
                <div className="product-main-container">
                    <h2 className="pName">{product.name}</h2>
                    {category[0].join(' > ')}
                    <div className="hr-line"></div>
                    {Object.keys(JSON.parse(product.attribute)).map((key, value) => (
                    <div key={key}>
                        <p>{key}: {JSON.parse(product.attribute)[key]}</p>
                    </div>
                )) }
                    <p className="price">{product.price.toLocaleString()}</p>
                    {(user.username !== "Admin") && 
                        <div className="btn-container">
                            <button className="toCart-btn me-2" onClick={saveProduct}>Add to Cart</button>
                            <button className="toCart-btn" onClick={removeProduct}>Remove on Cart</button>
                        </div>
                    }
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