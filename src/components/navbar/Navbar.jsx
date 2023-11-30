import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByCategory } from "../../store/categorySlice";
import { useEffect } from "react";


const Navbar = () => {
  const dispatch = useDispatch()
  const [isShow, setIsShow] = useState(false);
  const { categoryData: categories } = useSelector((state) => state.category);
  const {carts} = useSelector(state => state.cart)

  const clickHandler = (id) => {
    dispatch(fetchProductByCategory(id, 'single'))
    setIsShow(false)
  }

  const [isFixedTop, setIsFixedTop] = useState(false)
      useEffect(() => {
        window.addEventListener('scroll', () => {
           if (window.scrollY > 200) {
             setIsFixedTop(true);
           } else {
             setIsFixedTop(false);
           }
        })
    },[])

    return (
      <div className={`${isFixedTop ? "mb-28" : ""}`}>
        <nav
          className={`w-screen transition-all duration-1000 ${
            isFixedTop ? "fixed top-0 z-30" : ""
          } `}
        >
          <div className="flex bg-white py-2 justify-between px-3 md:px-24 items-center">
            <Link to="/">
              <div className="">
                <span className="text-xl md:text-2xl lg:text-3xl text-slate-700 font-bold">
                  Shopping
                </span>
                <span className="text-xl md:text-2xl lg:text-3xl font-bold text-yellow-500">
                  Hub
                </span>
              </div>
            </Link>

            <form
              action=""
              className="bg-white rounded-lg hidden sm:hidden md:flex items-center"
            >
              <input
                className="w-[250px] border-slate-300 border bg-transparent outline-none py-2 px-3"
                type="text"
                placeholder="Search here"
              />
              <i className="ri-search-2-line bg-amber-500 text-lg py-[.4rem] px-3 text-white"></i>
            </form>

            <div className="flex items-center ">
              <Link to="cart">
                <div className="relative flex items-center p-3 text-slate-500 font-medium text-center  rounded-lg ">
                  <i className="ri-shopping-bag-line md:text-xl"></i>
                  <span className="ps-1 pt-1 text-[.9rem] md:text-xs">
                    Cart
                  </span>
                  <div className="absolute inline-flex items-center justify-center w-5 h-5 md:w-6 md:h-6 md:text-xs text-[.5rem] font-bold text-white bg-red-500 border-2 border-white rounded-full top-0 -end-2 dark:border-gray-900">
                    {carts.length}
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="bg-slate-800 h-12 w-screen px-3 md:px-24 flex justify-end items-center ">
            <div
              className={`${
                isShow
                  ? "fixed bg-amber-50 top-0 right-0 z-20 bottom-0 w-72 shadow-xl"
                  : ""
              } overflow-x-hidden transition-all duration-300`}
            >
              <ul className={`${isShow ? "block mt-20" : "hidden md:flex "}`}>
                {categories &&
                  categories.map((category, index) => (
                    <li
                      onClick={() => clickHandler(category.id)}
                      key={index}
                      className={`px-3 ${
                        isShow
                          ? "font-bolder text-slate-500 px-8 md:text-[1rem] pb-3"
                          : "text-white"
                      }`}
                    >
                      <Link to={`category/1`}>{category.name}</Link>
                    </li>
                  ))}

                <span
                  onClick={() => {
                    setIsShow(!isShow);
                  }}
                  className={` ${
                    isShow ? "fixed top-3 right-4" : "hidden"
                  } text-white bg-stone-950 px-1 rounded-full md:hidden`}
                >
                  <i className="ri-close-line text-xl"></i>
                </span>
              </ul>
            </div>
            <div
              className="block md:hidden sm:block py-3"
              onClick={() => setIsShow(!isShow)}
            >
              <i className="ri-menu-line text-yellow-500 text-xl"></i>
            </div>
          </div>
        </nav>
      </div>
    );
};

export default Navbar;
