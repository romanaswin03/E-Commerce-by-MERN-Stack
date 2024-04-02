import {createOrderFail, createOrderRequest, createOrderSuccess, userOrdersFail, userOrdersRequest, userOrdersSuccess} from '../slices/orderSlice';
import axios from 'axios';

export const createOrder = order => async(dispatch) => {
    try {
        dispatch(createOrderRequest())
        const {data} = await axios.post(`/api/v1/order/new`, order)
        dispatch(createOrderSuccess(data))
    } catch (error) {
        dispatch(createOrderFail(error.response.data.message))
    }
}

export const userOrders = async(dispatch) => {
    try {
        dispatch(userOrdersRequest())
        // eslint-disable-next-line no-undef
        const {data} = await axios.get(`/api/v1/myorders`)
        dispatch(userOrdersSuccess(data))
    } catch (error) {
        dispatch(userOrdersFail(error.response.data.message))
    }
}