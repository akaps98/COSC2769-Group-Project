import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetail from "./components/ProductDetail";
import Logout from "./components/Logout";
import SellerPage from './components/Seller/SellerPage';
import AddProduct from './components/Seller/AddProduct';
import ProductManage from './components/Seller/ProductManage';
import OrderList from './components/Seller/OrderList';
import Unauthorized from './components/Unauthorized';

import CategoryTestData from './components/Admin/CategoryTestData';

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
    return <div>Laoding...</div>;
  }

  return (
    <Router>
      <div>
        {userType!=="Seller" && <Header />}
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Carousel />} />

            <Route exact path="/login" element={<Login userType={userType} user={user} />} />
            <Route exact path="/register" element={<Register userType={userType} user={user} />} />
            <Route exact path="/logout" element={<Logout />} />

            <Route path="/seller" element={(userType==="Seller")?<SellerPage />:<Unauthorized />}>
              <Route path='/seller' element={<ProductManage seller={user.SellerID}/>} />
              <Route path='/seller/orders' element={<OrderList seller={user.SellerID}/>} />
              <Route path='/seller/addProduct' element={<AddProduct seller={user.SellerID}/>} />
            </Route>

            <Route exact path="/detail" element={<ProductDetail />} />

            <Route path='/una' element={<Unauthorized />} />

            <Route path='/categoryTestData' element={<CategoryTestData />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
