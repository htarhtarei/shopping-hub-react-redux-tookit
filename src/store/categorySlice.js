import { createSlice } from "@reduxjs/toolkit"
import axios from "axios";

const initialState = {
    categoryData: [],
    status: 'loading',
    productByCategoryAll: [],
    productByCategoryAllStatus: 'loading',
    productByCategorySingle: [],
    productByCategorySingleStatus: 'loading'
}

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        setCategoryData: (state, { payload }) => {
            state.categoryData = payload
        },
        setCategoryStatus: (state, { payload }) => {
            state.status = payload;
        },
        setProductByCategoryAll: (state, { payload }) => {
            state.productByCategoryAll.push(payload);
        },
        setProductByCategoryAllStatus: (state, { payload }) => {
            state.productByCategoryAllStatus = payload
        },
        setProductByCategorySingle: (state, { payload }) => {
            state.productByCategorySingle = payload
        },
        setProductByCategorySingleStatus: (state, { payload }) => {
            state.productByCategorySingleStatus = payload
        }

    }
})

//to get all data from api
export const fetchAllCategories = () => {
    const getCategroies = (dispatch) => {
        dispatch(setCategoryStatus("loading"));
        axios
            .get("https://api.escuelajs.co/api/v1/categories")
            .then(
                (res) => dispatch(setCategoryData(res.data.slice(0, 5))),
                dispatch(setCategoryStatus("success"))
            )
            .catch((err) => console.log(err.message));
    };

    return getCategroies
}

//when we click each category,it'll get each product by category
export const fetchProductByCategory = (categoryId, type) => {
    const getProductByCategory = (dispatch) => {
        if (type === 'all') dispatch(setProductByCategoryAllStatus("loading"));
        if (type === "single") dispatch(setProductByCategorySingleStatus("loading"));

        axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`)
            .then(res => {
                if (type === 'all') {
                    dispatch(setProductByCategoryAll(res.data.slice(0, 10)));
                    dispatch(setProductByCategoryAllStatus("success"));
                } else if (type === 'single') {
                    dispatch(setProductByCategorySingle(res.data.slice(0, 20)));
                    dispatch(setProductByCategorySingleStatus("success"));
                }
            })
            .catch(err => console.log(err.message))
    }
    return getProductByCategory
}

export const {
    setCategoryData,
    setCategoryStatus,
    setProductByCategoryAll,
    setProductByCategoryAllStatus,
    setProductByCategorySingle,
    setProductByCategorySingleStatus,
} = categorySlice.actions;
export default categorySlice.reducer