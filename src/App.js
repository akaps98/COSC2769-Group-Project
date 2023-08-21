import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import SellerPage from './Components/Seller/SellerPage';
import Register from './Components/Register';
import ProductDetail from './Components/ProductDetail';
import AddProduct from './Components/Seller/AddProduct';

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
