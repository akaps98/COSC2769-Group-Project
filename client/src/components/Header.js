import logo from "../assets/images/logo.png"
import searchIcon from "../assets/images/search-icon.svg"
import shoppingCartIcon from "../assets/images/shopping-cart-icon.png"
import banner from "../assets/images/sale-banner-header.png"
import "../assets/styles/header.css"

function Header({ userType, username }) {
    return (
        <header className="header">
            <div className="headerTop">
                <nav>
                    <ul className="mb-0 pb-0">
                        <li><a href="#">Save More on App</a></li>
                        <li><a href="/search">Sell On Lazada</a></li>
                        <li><a href="#">Lazada Care</a></li>
                        {(username === "Admin") && <li><a href='/admin'>Admin page</a></li>}
                        {(userType === "Customer" && username !== "Admin") ? <li><a href="/order">Order</a></li> : null}
                        <li></li>
                    </ul>
                </nav>
            </div>

            <nav className="navbar navbar-expand-lg bg-body-tertiary my-0">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        <img src={logo} className="headerImage ms-2"></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#lazadaHeader" aria-controls="lazadaHeader" >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="d-flex float-right" id="lazadaHeader">
                        <a href="/cart">
                            <button className="cartBtn me-3">
                                {(username !== "Admin") && <img className="shoppingCartIcon" src={shoppingCartIcon}></img>}
                            </button>
                        </a>
                        {(userType === "") ?
                            <div className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <a href="/login"><button className="navBtn btn btn-outline-primary me-2">Log In</button></a>
                                <a href="/register"><button className="navBtn btn btn-primary border">Sign Up</button></a>
                            </div>
                        :
                            <div className="navbar-nav mx-auto mb-2 mb-lg-0">
                                <a href="/logout"><button className="navBtn btn btn-outline-primary me-2">Log Out</button></a>
                            </div>
                        }
                        
                </div>
                </div>
            </nav>
            
        </header>
    )
}
export default Header