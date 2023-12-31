import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetail from "./components/Customer/ProductDetail";
import Logout from "./components/Logout";
import SellerPage from './components/Seller/SellerPage';
import AddProduct from './components/Seller/AddProduct';
import ProductManage from './components/Seller/ProductManage';
import OrderList from './components/Seller/OrderList';
import Unauthorized from './components/Unauthorized';
import BrowseProduct from './components/Customer/BrowseProduct';
import CartPage from './components/ShoppingCart/CartPage';
import CartRow from './components/ShoppingCart/CartRow';
import OrderPage from './components/OrderManagement/OrderPage';

import Admin from './components/Admin/Admin';

function App() {
  Axios.defaults.withCredentials = true;
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});
  const [userType, setUserType] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Axios.get("http://localhost:3001/auth");
        if (response.data.loggedIn) {
          setUser(response.data.user[0]);
          if (response.data.user[0].status) {
            setUserType("Seller");
          } else {
            setUserType("Customer");
          }
        }
      } catch (error) {
        console.error("Error fetching login information:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <div>
        {userType!=="Seller" && <Header userType={userType} username={user.username} />}
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Carousel />} />

            <Route exact path="/login" element={<Login userType={userType} user={user} />} />
            <Route exact path="/register" element={<Register userType={userType} user={user} />} />
            <Route exact path="/logout" element={<Logout username={user.username} userType={userType}/>} />

            <Route path="/seller" element={(userType==="Seller")?<SellerPage status={user.status} />:<Unauthorized />}>
              <Route path='/seller' element={<ProductManage seller={user.SellerID}/>} />
              <Route path='/seller/orders' element={<OrderList seller={user.SellerID}/>} />
              <Route path='/seller/addProduct' element={<AddProduct seller={user.SellerID}/>} />
            </Route>

            <Route exact path="/search" element={<BrowseProduct />} />
            <Route exact path="/search/detail" element={<ProductDetail userType={userType} user={user}/>} />

            <Route exact path="/cart" element={<CartPage userType={userType} user={user}/>} />
            <Route exact path="/cartrow" element={<CartRow userType={userType} user={user}/>} />

            <Route exact path="/order" element={<OrderPage user={user}/>} />

            <Route path='/una' element={<Unauthorized />} />

            <Route path='/admin' element={(userType==="Customer"&&user.username==="Admin")?<Admin />:<Unauthorized/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
