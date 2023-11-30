import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate} from 'react-router-dom';
import { fetchSingleProduct, setShowSingleProduct } from '../../store/productSlice';
import Loader from '../../uits/loader/Loader';

const Category = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
     window.scrollTo(0, 0)
  },[])

//to get product data by category 
  const { productByCategorySingle: products, productByCategorySingleStatus:isLoading } =
    useSelector((state) => state.category);
  
  const clickHandler = (id) => {
    dispatch(fetchSingleProduct(id))
    dispatch(setShowSingleProduct(true))
  }

  const backHandler = () => {
    //redirect previous page
    navigate("/");
  };

  if (isLoading === 'loading') {
     return (
       <div className="flex min-h-screen items-center justify-center">
         <Loader/>
       </div>
     );
  }

  if (products.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-xl md:text-2xl">We don't add product yet😅</h1>
        <p className="flex items-center underline text-yellow-500" onClick={backHandler}>
          home page
        </p>
      </div>
    );
  }
  
  return (
    <div className="">
      {products.length > 0 && (
        <div className="">
          <div className="bg-white shadow-2xl w-full px-4 md:px-18 lg:px-20 py-4 text-slate-500 text-lg">
            <Link to="/">
              <i className="ri-home-4-line"></i>
              <span className='lowercase'>
                <i className="ri-arrow-right-s-line text-xl px-2"></i>
                {products[0].category.name}
              </span>
            </Link>
          </div>
          <div className="mt-12 mb-20 mx-4 md:mx-18 lg:mx-20">
            <h1 className="text-slate-700 text-2xl md:text-3xl font-extrabold pb-6 uppercase">
              {products[0].category.name}
            </h1>

            <div className="">
              <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {products.map((product, index) => (
                  <li
                    onClick={()=>clickHandler(product.id)}
                    key={index}
                    className="bg-white shadow-xl relative p-5 rounded-lg pb-4 border"
                  >
                    <img
                      className="w-full h-[300px] md:h-auto"
                      src={product.images[0]}
                      alt=""
                    />
                    <h2 className="pt-4 text-gray-600 text-lg ">
                      {product.title}
                    </h2>
                    <p className="font-bold text-xl pt-1">$99</p>
                    <button className="absolute top-7 font-semibold right-7 bg-yellow-500 text-white px-3 uppercase text-[.8rem] rounded-xl">
                      {product.category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category
