import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllCart, setSubTotal } from "../../store/cartSlice";
import { formatPrice } from "../../uits/helper/formatPrice";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //to get cart data from redux store
  const { carts, deliveryFee } = useSelector((state) => state.cart);
  const { totalAmount: total } = useSelector((state) => state.cart);

  //to get subtotal val
  useEffect(() => {
    window.scrollTo(0, 0);

    let getPrices;
    let addPrice;
    if (carts.length > 0) {
      getPrices = carts.map((cart) => cart.totalPrice);
      addPrice = getPrices.reduce((prev, curr) => prev + curr);
      dispatch(setSubTotal(addPrice))
    }
   
  }, []);

  const clickHandler = () => {
    //redirect previous page
    navigate(-1);
  };

  const clearHandler = () => {
    dispatch(clearAllCart());
  };

  const checkOutHandler = () => {
    dispatch(clearAllCart());
    navigate('/')
    alert("we get ur order,we will deliver soon")
  };

  if (carts.length === 0) {
    return (
      <div className="bg-gray-100 px-4 md:px-24 pt-4">
        <span
          className="flex items-center text-yellow-500"
          onClick={clickHandler}
        >
          <i className="ri-arrow-left-line text-xl font-bold pe-1"></i> back
        </span>
        <h1 className=" text-xl sm:text-2xl md:text-3xl font-bold text-center text-red-500 py-40">
          There is no cart here , yet !
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 px-4 lg:px-56 pt-4">
      <span
        className="flex items-center text-yellow-500"
        onClick={clickHandler}
      >
        <i className="ri-arrow-left-line text-xl font-bold pe-1"></i> back
      </span>
      <div className="min:h-screen pb-20 ">
        <h1 className="mb-8 text-3xl font-bold pt-8">My Cart</h1>
        <div className="max-w-5xl justify-center md:flex md:space-x-6 xl:px-0">
          <ul className="rounded-lg md:w-2/3">
            {carts.map((cart) => (
              <CartItem key={cart.id} cart={cart} />
            ))}
          </ul>

          {/* sub total */}
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Subtotal</p>
              <p className="text-gray-700">{formatPrice(total) }</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">Delivery</p>
              <p className="text-gray-700">{formatPrice(deliveryFee)}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div className="">
                <p className="mb-1 text-lg font-bold">{formatPrice(total + deliveryFee) } USD</p>
                <p className="text-sm text-gray-700">including VAT</p>
              </div>
            </div>
            <button
              onClick={checkOutHandler}
              className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Check out
            </button>
            <button
              onClick={clearHandler}
              className="mt-2 w-full rounded-md bg-red-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
            >
              Cancel all cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
