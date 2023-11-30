import { useDispatch } from "react-redux";
import { fetchSingleProduct, setShowSingleProduct } from "../../store/productSlice";
import { formatPrice } from "../../uits/helper/formatPrice";

const CategoryProduct = ({ products,name }) => {
  const dispatch = useDispatch()

  const clickHandler = (id) => {
    dispatch(fetchSingleProduct(id))
    dispatch(setShowSingleProduct(true))
  }
  
  return (
    <div className="">
      {products && (
        <div className="mt-24">
          <h1 className="text-slate-700 text-2xl md:text-3xl font-extrabold pb-6 uppercase">
            {name}
          </h1>
          <div className="">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product) => (
                <li
                  onClick={() => clickHandler(product.id)}
                  key={product.id}
                  className="bg-white shadow-xl relative p-5 rounded-lg pb-4 border"
                >
                  <img
                    className="w-full h-auto md:h-[280px] lg:h-[250px]"
                    src={product.images[0]}
                    alt=""
                  />
                  <h2 className="pt-4 text-gray-600 text-lg ">
                    {product.title}
                  </h2>
                  <p className="font-bold text-xl pt-1">
                    {formatPrice(product.price)}
                  </p>
                  <button className="absolute top-7 font-semibold right-7 bg-yellow-500 text-white px-3 uppercase text-[.8rem] rounded-xl">
                    {product.category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoryProduct
