import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import wishListReducer from './wishListSlice';
import itemReducer from './itemSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        wishList: wishListReducer,
        items: itemReducer
    },
})