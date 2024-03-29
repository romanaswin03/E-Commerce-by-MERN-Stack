import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        isAuthenticate: false
    },
    reducers:{
        loginRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        loginSuccess(state, action){
            return {
                loading: false,
                isAuthenticate: true,
                user: action.payload.user
            }
        },
        loginFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        clearError(state, action){
            return {
                ...state,
                error: null
            }
        }
    }
});

const { actions, reducer } = authSlice;

export const {loginRequest, loginSuccess, loginFail, clearError} = actions;

export default reducer;