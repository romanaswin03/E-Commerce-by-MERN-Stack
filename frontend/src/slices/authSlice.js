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
        },
        registerRequest(state, action){
            return {
                ...state,
                loading: true
            }
        },
        registerSuccess(state, action){
            return {
                loading: false,
                isAuthenticate: true,
                user: action.payload.user
            }
        },
        registerFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        loadUserRequest(state, action){
            return {
                ...state,
                isAuthenticate: false,
                loading: true
            }
        },
        loadUserSuccess(state, action){
            return {
                loading: false,
                isAuthenticate: true,
                user: action.payload.user
            }
        },
        loadUserFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        },
        logOutSuccess(state, action){
            return {
                loading: false,
                isAuthenticate: false,
            }
        },
        logOutFail(state, action){
            return {
                ...state,
                error: action.payload
            }
        },
        updateProfileRequest(state, action){
            return {
                ...state,
                loading: true,
                isUpdated: false
            }
        },
        updateProfileSuccess(state, action){
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isUpdated: true
            }
        },
        updateProfileFail(state, action){
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        }
    }
});

const { actions, reducer } = authSlice;

export const {
    loginRequest, 
    loginSuccess, 
    loginFail, 
    clearError,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logOutSuccess,
    logOutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail
} = actions;

export default reducer;