import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sellers/lazada-seller-center.png"

function SellerHeader() {
    const [dropdown, setDropdown] = useState(true);
    const handleToggle = () => setDropdown(prev => !prev);
    return (
        <div className="seller-header-container">
            <Link to={"/seller"}><img src={logo} alt="" className="seller-logo mb-4" /></Link>
            <div className="seller-header-main-container">
                <div>
                    <p onClick={handleToggle}
                        className={dropdown ? "product-header section-header dropdown-enabled" : "product-header section-header dropdown-disabled"}
                    >
                        Product
                    </p>
                    {dropdown &&
                        <div className="ps-4 mb-2">
                            <div className="mb-4">
                                <Link to={"/seller"}>Product Management</Link>
                            </div>
                            <div className="mb-4">
                                <Link to={"/seller/addProduct"}>Add Product</Link>
                            </div>
                        </div>
                    }
                </div>
                <div>
                    <Link className="order-header section-header" to={"/seller/orders"}>Order Management</Link>
                </div>
                <button className="sign-out-btn">SIGN OUT</button>
            </div>
        </div>
    )
}

export default SellerHeader;