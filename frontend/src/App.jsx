import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/cartContext";
import ProductList from "./pages/productList";
import Cart from "./pages/Cart";
import Checkout from "./pages/CheckOut";
import Navbar from "./component/Navbar";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
