import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    products: [],
    singleProduct: {},
    showSingleProduct: false
}

export const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setAllProduct: (state, { payload }) => {
            state.products = payload;
        },
        setSingleProduct: (state, { payload }) => {
            state.singleProduct = payload;
        },
        setShowSingleProduct: (state, { payload }) => {
            state.showSingleProduct = payload
        },
        removeSingleProduct: (state) => {
            state.singleProduct = {}
        }
    },
});

//to get all product data
export const fetchAllProduct = () => {
    const getAllProduct = (dispatch) => {
        axios
            .get("https://api.escuelajs.co/api/v1/products")
            .then((res) => dispatch(setAllProduct(res.data.slice(0, 20))))
            .catch((err) => console.log(err.message));
    };

    return getAllProduct

}

//when we click product ,modal will appear by each product
export const fetchSingleProduct = (productId) => {
    const getSingleProduct = (dispatch) => {
        axios.get(`https://api.escuelajs.co/api/v1/products/${productId}`)
            .then(res => dispatch(setSingleProduct(res.data)))
            .catch(err => console.log(err.message));
    }
    return getSingleProduct
}


export const {
    setAllProduct,
    setSingleProduct,
    setShowSingleProduct,
    removeSingleProduct,
} = productSlice.actions;
export default productSlice.reducer