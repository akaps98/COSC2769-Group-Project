import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import productImg from "../assets/images/products/iPhone14.png";
import guaranteed from "../assets/images/guaranteed.png";
import heart from "../assets/images/heart.png"

function ProductDetail({ user }) {
    const product = useLocation().state.data;
    const category = Array((JSON.parse(product.category.split(","))));
    console.log(product.imagePath)
    const [ quantity, setQuantity ] = useState(1);
    const [ isWrapped, setIsWrapped ] = useState(true);
    function handleClick(){
        setIsWrapped(prev => !prev);
    }
    function saveOnLocalStorage() {
        if(user.username == undefined) { // non - member
            // localStorage.clear();
            if(localStorage.getItem(product.ProductID) == null) {
                localStorage.setItem(product.ProductID, quantity);
            } else {
                //localStorage.setItem(product.ProductID, quantity += quantity)
            }
        } else { // member

        }
    }
    
    function removeOnLocalStorage() {
        if(user.username == undefined) { // non - member
            if(localStorage.getItem(product.ProductID) != null) {
                localStorage.removeItem(product.ProductID);
            } else {
                //localStorage.setItem(product.ProductID, quantity += quantity)
            }
        } else { // member

        }
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
                    <div className="qty-container">
                        <p className="text-secondary pt-1">Quantity</p>
                        <button className="qty-btn" onClick={() => {
                            if(quantity != 1) {
                                setQuantity(quantity - 1)
                            }
                        }}>-</button>
                        <input type="text" className="quantity" value={quantity} readOnly/>
                        <button className="qty-btn" onClick={() => {setQuantity(quantity + 1)}}>+</button>
                        <p className="text-secondary stock">{product.quantity} available</p>
                    </div>
                    <div className="btn-container">
                        <button className="buy-btn">Buy Now</button>
                        <button className="toCart-btn" onClick={saveOnLocalStorage}>Add to Cart</button>
                        <button className="toCart-btn" onClick={removeOnLocalStorage}>Remove on Cart</button>
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
                        <p className="seller-name">Seller Name</p>
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