import { createSlice } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
    let cart = localStorage.getItem("carts");
    if (cart) {
        return JSON.parse(localStorage.getItem("carts"));
    } else {
        return [];
    }
};

const storeInLocalStorage = (data) => {
    localStorage.setItem("carts", JSON.stringify(data));
};

const initialState = {
    carts: fetchFromLocalStorage(),
    deliveryFee: 100,
    totalAmount: 0,
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, { payload }) => {
            const existCart = state.carts.find(cart => cart.id === payload.id);
            if (existCart) {
                const addcart = state.carts.map((cart) => {
                    if (cart.id === payload.id) {
                        let newqty = cart.qtyOfProduct + payload.qtyOfProduct;
                        let newTotal = cart.price * newqty;
                        return {
                            ...cart,
                            qtyOfProduct: newqty,
                            totalPrice: newTotal,
                        };
                    } else {
                        return cart
                    }
                });
                state.carts = addcart;
                storeInLocalStorage(state.carts);
            } else {
                state.carts.push(payload);
                storeInLocalStorage(state.carts);
            }
        },
        removeCart: (state, { payload }) => {
            const newCarts = state.carts.filter(cart => cart.id !== payload)
            state.carts = newCarts
            storeInLocalStorage(state.carts);
        },
        clearAllCart: (state) => {
            state.carts = []
            storeInLocalStorage(state.carts);
        },
        incAndDesCart: (state, { payload }) => {
            const items = state.carts.map(item => {
                if (item.id === payload.id) {
                    if (payload.type === "increase") {
                        let tempQty = item.qtyOfProduct + 1;
                        let tempTotalPrice = tempQty * item.price;

                        return {
                            ...item,
                            qtyOfProduct: tempQty,
                            totalPrice: tempTotalPrice,
                        };

                    } else if (payload.type === "decrease") {
                        let tempQty = item.qtyOfProduct - 1;
                        let tempTotalPrice = tempQty * item.price;
                        if (tempQty < 1) {
                            return tempQty = 1;
                        };
                        return {
                            ...item,
                            qtyOfProduct: tempQty,
                            totalPrice: tempTotalPrice,
                        };
                    }

                } else {
                    return item;
                }
            })
            state.carts = items
            storeInLocalStorage(state.carts);
        },
        setSubTotal: (state,{payload}) => {
            state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
                return (cartTotal += cartItem.totalPrice);
            }, 0);
        }


    }
})


export const { addToCart, removeCart, clearAllCart, incAndDesCart, setSubTotal } =
cartSlice.actions;
export default cartSlice.reducer