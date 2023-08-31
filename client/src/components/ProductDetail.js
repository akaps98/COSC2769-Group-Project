import React, { useState } from "react";
import { useLocation } from 'react-router-dom'
import productImg from "../assets/images/products/iPhone14.png";
import guaranteed from "../assets/images/guaranteed.png";
import heart from "../assets/images/heart.png"

function ProductDetail({ user }) {
    const product = useLocation().state.data;
    const category = Array((JSON.parse(product.category.split(","))));
    console.log(product.imagePath);
    //console.log()
    const price = 22000000
    const rating = 3.8;
    const [ isWrapped, setIsWrapped ] = useState(true);
    function handleClick(){
        setIsWrapped(prev => !prev);
    }
    return (
        <>
            <div className="product-detail-container">
                <h1>{user.username}</h1>
                <div className="img-container">
                    <img className="product-img" src={product.imagePath} alt="" />
                </div>
                <div className="product-main-container">
                    <h2 className="pName">{product.name}</h2>
                    {/* <p className="stars" style={{ "--rating": rating }}>1490 Ratings</p> */}
                    {category.map(name => <p className="text-muted category-text">{name + '\n'}</p>)}
                    <div className="hr-line"></div>
                    <p className="price">{product.price.toLocaleString()}</p>
                    <div className="qty-container">
                        <p className="text-secondary pt-1">Quantity</p>
                        <button className="qty-btn">-</button>
                        <input type="text" className="quantity" defaultValue={1} />
                        <button className="qty-btn">+</button>
                        <p className="text-secondary stock">{product.quantity} available</p>
                    </div>
                    <div className="btn-container">
                        <button className="buy-btn">Buy Now</button>
                        <button className="toCart-btn">Add to Cart</button>
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