import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/lazada-seller-center.png"

function SellerHeader(){
    return(
        <div className="seller-header-container">
            <Link to={"/seller"}><img src={logo} alt="" className="seller-logo"/></Link>
            <button className="sign-out-btn">SIGN OUT</button>
        </div>
    )
}

export default SellerHeader;