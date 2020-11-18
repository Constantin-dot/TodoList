import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}
const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
    name: "app",
    initialState: initialState,
    reducers: {
        setAppStatusAC: (state, action: PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setAppErrorAC: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        },
        setAppIsInitializedAC: (state, action: PayloadAction<{isInitialized: boolean}>) => {
            state.isInitialized = action.payload.isInitialized
        },
    }
})

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setAppIsInitializedAC} = slice.actions

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0){
            dispatch(setIsLoggedInAC({value: true}))
        }
        dispatch(setAppIsInitializedAC({isInitialized: true}))
    })
}

// types
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

