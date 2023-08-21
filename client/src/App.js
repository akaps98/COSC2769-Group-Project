import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Carousel from "./components/Carousel";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDetail from "./components/ProductDetail";
import Logout from "./components/Logout";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Carousel />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/detail" element={<ProductDetail />} />
            <Route exact path="/logout" element={<Logout />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
