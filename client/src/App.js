import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SellerPage from './components/Seller/SellerPage';
import Register from './components/Register';
import ProductDetail from './components/ProductDetail';
import AddProduct from './components/Seller/AddProduct';

function App() {
  return (
    <Router>
      <div>
        <div className="App">
          <Routes>
            <Route path="/seller" element={<SellerPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/detail' element={<ProductDetail />} />
            <Route path='/addProduct' element={<AddProduct/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
