import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer,
    cartState: cartReducer
})

const store = configureStore({
    reducer
  })

export default store; 