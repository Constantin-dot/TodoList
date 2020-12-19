import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {authAPI} from "../../api/auth-api"
import {authActions} from "../auth"

const initializeApp = createAsyncThunk("application/initializeApp",
    async (param, {dispatch}) => {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(authActions.setIsLoggedIn({value: true}))
        }
    }
)

export const asyncActions = {initializeApp}

export const slice = createSlice({
    name: "application",
    initialState: {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
    reducers: {
        setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
            state.status = action.payload.status
        },
        setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
            state.error = action.payload.error
        }
    },
    extraReducers: builder => {
        builder.addCase(initializeApp.fulfilled, (state) => {
            state.isInitialized = true
        })
    }
})

// types
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}