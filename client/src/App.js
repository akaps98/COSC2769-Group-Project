import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SellerPage from './components/Seller/SellerPage';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/Seller/AddProduct';
import ProductManage from './components/Seller/ProductManage';
import OrderList from './components/Seller/OrderList';
import Unauthorized from './components/Unauthorized';

function App() {
  return (
    <Router>
      <div>
        <div className="App">
          <Routes>
            <Route path="/seller" element={<SellerPage />}>
              <Route path='/seller' element={<ProductManage />} />
              <Route path='/seller/orders' element={<OrderList />} />
              <Route path='/seller/addProduct' element={<AddProduct />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/detail' element={<ProductDetail />} />
            <Route path='/una' element={<Unauthorized />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
