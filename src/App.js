import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Product from "./components/Product";
import ShoppingCart from "./components/ShoppingCart";
export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Product />} />
          <Route path="/cart" element={<ShoppingCart />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
