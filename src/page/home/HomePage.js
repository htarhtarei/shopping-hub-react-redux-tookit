import Category from '../../components/category/Category'
import ProductList from '../../components/productList/ProductList';
import Slider from '../../uits/Slider/Slider'
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProduct } from "../../store/productSlice";
import { fetchAllCategories, fetchProductByCategory } from "../../store/categorySlice";
import CategoryProduct from '../../components/categoryProduct/CategoryProduct';
import Loader from '../../uits/loader/Loader';


const HomePage = () => {
  const dispatch = useDispatch();
  //to get all product data
  const { products } = useSelector((state) => state.product);
  // to get all categories data
  const { categoryData: categories, status: loadingStatus } = useSelector(
    (state) => state.category
  );

  //to get product by category data
  const { productByCategoryAll: categoryProduct, productByCategoryAllStatus } =
    useSelector((state) => state.category);
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    //from productslice
    dispatch(fetchAllProduct());

    //from categoryslice
    dispatch(fetchAllCategories());
    dispatch(fetchProductByCategory(1, 'all'))
    dispatch(fetchProductByCategory(2,'all'))
  }, []);

  if (loadingStatus === "loading" || productByCategoryAllStatus === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }
  
  return (
    <div>
      <Slider />
      <div className="mb-20 mx-4 md:mx-18 lg:mx-20">
        <Category categories={categories} loadingStatus={loadingStatus} />
        <ProductList products={products} />
        {categoryProduct[0] && (
          <CategoryProduct products={categoryProduct[0]} name ="clothes" />
        )}
        {categoryProduct[1] && (
          <CategoryProduct products={categoryProduct[1]} name="Electronic"/>
        )}
      </div>
    </div>
  );
}

export default HomePage
