import React, { useState } from "react";

function ProductDetail() {
    const price = 22000000
    const rating = 3.8;
    const [ isWrapped, setIsWrapped ] = useState(true);
    function handleClick(){
        setIsWrapped(prev => !prev);
    }
    return (
        <>
            <div className="product-detail-container">
                <div className="img-container">
                    <img className="product-img" src="./iphone14.png" alt="" />
                </div>
                <div className="product-main-container">
                    <h2 className="pName">iPhone 14 Pro - Hàng Chính Hãng VN/A</h2>
                    <p className="stars" style={{ "--rating": rating }}>1490 Ratings</p>
                    <p className="text-muted category-text">Categories: Product Category | Subcategory</p>
                    <div className="hr-line"></div>
                    <p className="price">{price.toLocaleString()}</p>
                    <div className="qty-container">
                        <p className="text-secondary pt-1">Quantity</p>
                        <button className="qty-btn">-</button>
                        <input type="text" className="quantity" defaultValue={1} />
                        <button className="qty-btn">+</button>
                        <p className="text-secondary stock">1000 pieces available</p>
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
                            <p><img src="./images/guaranteed.png" alt="" />100% Authentic</p>
                            <p><img src="./images/heart.png" alt="" />Change of Mind</p>
                            <p><img src="./images/guaranteed.png" alt="" />15 Days Return</p>
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
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                    Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt
                    ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit
                    in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt
                    in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <div className="wrap-toggle-btn-container">
                    <button className="wrap-toggle-btn" onClick={handleClick}>{isWrapped ? "VIEW MORE" : "VIEW LESS"}</button>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;