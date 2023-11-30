import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import { removeSingleProduct, setShowSingleProduct } from "../../store/productSlice";
import { formatPrice } from "../../uits/helper/formatPrice";

const SingleProduct = ({product}) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1)
  const navigate = useNavigate()
  
  //whenn I clcik close icon ,singleProduct component is closed
  const clickHandler = () => {
    dispatch(setShowSingleProduct(false));
   //to remove singleproduct data in product store
    dispatch(removeSingleProduct())
  };

  //when I click plus icon ,it'll increase number
  const increaseHandler = () => {
    setQty(prev => prev + 1)
  };

  //when I click plus icon ,it'll increase number
  const decreaseHandler = () => {
    if (parseInt(qty) > 0) {
      setQty((prev) => prev - 1);
    } else {
      // if qty is less than 0 ,singleProduct component will close
      dispatch(setShowSingleProduct(false))
    }
  };

  //to add product to cart
  const clickAddCartHandler = (product) => {
    const addCart = {...product,qtyOfProduct : qty ,totalPrice : qty * product.price}
    dispatch(addToCart(addCart));
    // to close product modal box
    dispatch(setShowSingleProduct(false))
    //to remove data from single product in redux 
    dispatch(removeSingleProduct())
    //redirect cart page
    // navigate('/cart')

    

  }


  return (
    <div className="fixed w-full h-full flex gap-4 justify-center items-center z-50 bg-slate-900/70">
      <div className="bg-white md:w-[820px] relative w-[320px] sm:w-[400px]  flex md:flex-row flex-col items-center p-6 rounded-lg">
        <img
          className=" w-[250px] md:w-[380px] sm:w-[360px] h-[250px]"
          src={product.images && product.images[0]}
          alt=""
        />
        <div className="md:ps-8 w-[250px] md:auto">
          <h1 className="md:text-2xl text-xl font-semibold text-slate-600 pb-2 pt-4">
            {product.title}
          </h1>
          <p className="text-slate-500 pb-4 md:text-[1.1rem] leading-6">
            {product.description}
          </p>
          <p className="md:text-2xl text-xl border-b-2 pb-3 flex-wrap  border-slate-500 border-dotted font-extrabold">
            Price :{formatPrice(product.price)}
          </p>
          <p className="pt-3 md:text-lg text-gray-600">
            Qty :
            <button
              onClick={decreaseHandler}
              className="bg-yellow-500 text-white px-3 ms-3 me-4 text-xl font-bold"
            >
              -
            </button>
            <span>{qty }</span>
            <button
              onClick={increaseHandler}
              className="bg-yellow-500 text-white px-3 ms-4  text-xl font-bold"
            >
              +
            </button>
          </p>
          <button onClick={()=>clickAddCartHandler(product)} className="bg-slate-800 text-white md:mt-8 mt-4 py-2 md:py-3 px-3 md:px-5 rounded-lg md:text-lg">
            <i className="ri-shopping-cart-line pe-2"></i>
            <span>Add To Cart</span>
          </button>
          <div
            onClick={clickHandler}
            className="flex absolute -top-2 -right-2 justify-center items-center w-7 h-7 rounded-full bg-gray-800 font-bold text-white"
          >
            <i className="ri-close-line"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
