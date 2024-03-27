import productsReducer from './slices/productsSlice'
import productReducer from './slices/productSlice';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const reducer = combineReducers({
    productsState: productsReducer,
    productState: productReducer
})

const store = configureStore({
    reducer
  })

export default store; 