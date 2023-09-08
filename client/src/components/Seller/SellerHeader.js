import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/sellers/lazada-seller-center.png"

function SellerHeader({ setMenuToggle, menuToggle }) {
    const [dropdown, setDropdown] = useState(true);
    const handleToggle = () => setDropdown(prev => !prev);
    const handleMenuToggle = () => setMenuToggle(prev => !prev);
    return (
        <div className="seller-header-container">
            <div className="seller-header-logo-container">
                <button className="menu-btn" onClick={handleMenuToggle} />
                <Link to={"/seller"}><img src={logo} alt="" className="seller-logo mb-4" /></Link>
            </div>
            <div className={menuToggle ? "seller-header-main-container seller-header-small-container" : "seller-header-main-container"}>
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
                <Link className="sign-out-btn" to={"/logout"}>SIGN OUT</Link>
            </div>
        </div>
    )
}

export default SellerHeader;