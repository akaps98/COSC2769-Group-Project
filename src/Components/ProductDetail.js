import React from "react";

function ProductDetail() {
    const price = 22000000
    return (
        <>
            <div className="product-detail-container">
                <div className="img-container">
                    <img className="product-img" src="./iphone14.png"></img>
                    <div className="seller-name-container">
                        <p className="text-secondary">Sold By</p>
                        <p className="seller-name">Seller Name</p>
                    </div>
                </div>
                <div className="product-main-container">
                    <h2 className="pName">iPhone 14 Pro - Hàng Chính Hãng VN/A</h2>
                    <p className="text-muted category-text">Categories: Product Category | Subcategory</p>
                    <hr />
                    <p className="price"><span className="currency">₫</span>{price.toLocaleString()}</p>
                    <div>
                        <p className="text-secondary">Shipping</p>
                    </div>
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
            </div>
            <div className="product-desc-container">
                <p className="desc-title">Product description for product name</p>
                <p>
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
            </div>
        </>
    )
}

export default ProductDetail;