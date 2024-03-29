import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice'

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer,
    authState: authReducer
})

const store = configureStore({
    reducer
  })

export default store; 