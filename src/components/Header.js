import logo from "../assets/images/logo.png"
import searchIcon from "../assets/images/search-icon.svg"
import shoppingCartIcon from "../assets/images/shopping-cart-icon.png"
import banner from "../assets/images/sale-banner-header.png"

function Header() {
    return (
        <header className="header">
            <div className="headerTop">
                <nav>
                    <ul className="">
                        <li><a href="#">Save More on App</a></li>
                        <li><a href="#">Sell On Lazada</a></li>
                        <li><a href="#">Lazada Care</a></li>
                        <li><a href="#">Login</a></li>
                        <li><a href="#">Sign Up</a></li>
                    </ul>
                </nav>
            </div>
            <div className="headerBottom">
                <div className="container d-flex justify-content-center align-items-center">
                    <div className="logo">
                        <img src={logo}></img>
                    </div>
                    <form className="headerSearch d-flex">
                        <input type="text" className="searchText" id="searchText" placeholder="Search in Lazada"></input>
                        <button><img src={searchIcon}></img></button>
                    </form>
                    <img className="shoppingCartIcon" src={shoppingCartIcon}></img>
                    <div className="banner">
                        <img src={banner}></img>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header