import { Routes, Route } from "react-router-dom";
import "./App.css";
import { useSelector } from "react-redux";


//components
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import ScrollButton from "./uits/ScrollButton/ScrollButton";
import SingleProduct from "./components/singleProduct/SingleProduct";


//pages
import Cart from "./page/cart/Cart";
import Category from "./page/category/Category";
import HomePage from "./page/home/HomePage";


function App() {  
  const { singleProduct: product } = useSelector((state) => state.product);
  const { showSingleProduct: isShow } = useSelector(state => state.product)
  

  return (
    <div className="overflow-x-hidden">
      {isShow && product && <SingleProduct product={product} />}
      <Navbar />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="category/:id" element={<Category />} />
          <Route path="cart" element={<Cart />} />
        </Routes>

        <Footer />
        <ScrollButton />
      </div>
  );
}

export default App;
