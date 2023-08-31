import React, { useState } from "react";
import guaranteed from "../assets/images/guaranteed.png";
import heart from "../assets/images/heart.png"

function ProductDetail() {
    // NOTE ******************************
    // This is a temporary product setting 
    // Apply props { product } or implement smth else when customer page is developed
    const product = {
        ProductID: 10, 
        name: 'Desk OfficeLife', 
        price: 3399000, 
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 
        imagePath: 'imageUploads/10.png', 
        category: '["Home", "Furnitures", "Home Office", "Desks"]', 
        quantity: 55, 
        dateAdded: '2023-08-09', 
        SellerID: 1 
    };
    // NOTE ******************************

    const rating = 3.8;
    const [ isWrapped, setIsWrapped ] = useState(true);
    function handleClick(){
        setIsWrapped(prev => !prev);
    }
    return (
        <>
            <div className="product-detail-container">
                <div className="img-container">
                    <img className="product-img" src={`http://localhost:3001/${product.imagePath}`} alt={product.ProductID} />
                </div>
                <div className="product-main-container">
                    <h2 className="pName">{product.name}</h2>
                    <p className="stars" style={{ "--rating": rating }}>1490 Ratings</p>
                    <p className="text-muted category-text">Categories: {JSON.parse(product.category).join(' > ')}</p>
                    <div className="hr-line"></div>
                    <p className="price">{product.price.toLocaleString()}</p>
                    <div className="qty-container">
                        <p className="text-secondary pt-1">Quantity</p>
                        <button className="qty-btn">-</button>
                        <input type="text" className="quantity" defaultValue={1} />
                        <button className="qty-btn">+</button>
                        <p className="text-secondary stock">{product.quantity} pieces available</p>
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