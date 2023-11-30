import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {  incAndDesCart, removeCart, setSubTotal } from '../../store/cartSlice';
import { formatPrice } from "../../uits/helper/formatPrice";


const CartItem = ({ cart }) => {
  
  const dispatch = useDispatch()
  const { carts } = useSelector(state => state.cart)
  

  let getPrices;
  let addPrice;
  if (carts) {
       getPrices = carts.map((cart) => cart.totalPrice);
       addPrice = getPrices.reduce((prev, curr) => prev + curr);
     }
 
   const removeHandler = () => {
     dispatch(removeCart(cart.id))
     dispatch(setSubTotal(addPrice))
  }

  const increaseHandler = (id,type) => {
    dispatch(incAndDesCart({ id, type }));
     dispatch(setSubTotal(addPrice));


  }

  const decreaseHandler = (id,type) => {
    dispatch(incAndDesCart({ id, type }))
     dispatch(setSubTotal(addPrice));

    if (cart.qtyOfProduct >= 1) {
      dispatch(removeCart())
    }
  }
    
    
  return (
    <li className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img src={cart.images[0]} className="w-full rounded-lg sm:w-40" />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-bold text-gray-900">{cart.title}</h2>
        </div>
        <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center border-gray-100">
            <span
              onClick={()=>decreaseHandler(cart.id,'decrease')}
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              -
            </span>
            <span className="px-3">{cart.qtyOfProduct}</span>
            <span
              onClick={() => {increaseHandler(cart.id ,'increase') }}
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
            >
              +
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <p className="text-sm">{formatPrice(cart.totalPrice)}</p>
            <span onClick={removeHandler}>
              <i className="ri-close-line text-xl"></i>
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem
