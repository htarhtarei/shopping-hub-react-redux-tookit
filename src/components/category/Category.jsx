import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { fetchProductByCategory } from "../../store/categorySlice";


const Category = ({ categories, loadingStatus }) => {
  const dispatch = useDispatch();

  //when we click category , it'll fectch product data by category
  const clickHandler = (id) => {
    dispatch(fetchProductByCategory(id , 'single'))
  }

 
  return (
    <div className="mt-12">
      {loadingStatus === "loading" ? (
        <h1 className='text-2xl text-center'>Loading....</h1>
      ) : (
        <div className="">
          <h1 className="text-slate-700 text-2xl md:text-3xl font-extrabold pb-6 uppercase">
            Category
          </h1>
          <div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories &&
                categories.map((category, index) => (
                  <li className="mb-4" key={index} onClick={()=>{clickHandler(category.id)}}>
                    <Link to={`category/${category.id}`}>
                      <img className="rounded-xl h-auto sm:h-[300px] md:h-[300px]" src={category.image} alt="" />
                      <h2 className="text-xl md:font-extrabold pt-2 text-center font-bold">
                        {category.name}
                      </h2>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category
