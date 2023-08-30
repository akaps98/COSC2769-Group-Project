import logo from "../assets/images/logo.png"
import searchIcon from "../assets/images/search-icon.svg"
import shoppingCartIcon from "../assets/images/shopping-cart-icon.png"
import banner from "../assets/images/sale-banner-header.png"

// Header Icons
import icon1 from "../assets/images/header-icon-1.png"
import icon2 from "../assets/images/header-icon-2.png"
import icon3 from "../assets/images/header-icon-3.png"
import icon4 from "../assets/images/header-icon-4.png"

function Header() {
    return (
        <header className="header pb-3">
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
            <div className="headerCaption d-flex justify-content-center align-items-center">
                <select name="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="opel">Opel</option>
                    <option value="audi">Audi</option>
                </select>
                <div>
                    <a href="#">
                        <img src={icon1} className="d-inline-block"></img>
                        <span>LazMall</span>
                    </a>
                    <a href="#">
                        <img src={icon2} className="d-inline-block"></img>
                        <span>Vouchers</span>
                    </a>
                    <a href="#">
                        <img src={icon3} className="d-inline-block"></img>
                        <span>Top Up & eCoupon</span>
                    </a>
                    <a href="#">
                        <img src={icon4} className="d-inline-block"></img>
                        <span>LazGlobal</span>
                    </a>
                </div>
            </div>
        </header>
    )
}
export default Header