import {applicationActions} from "../application"
import {authAPI} from "../../api/auth-api"
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/errorUtils"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {FieldErrorType, LoginParamsType} from "../../api/types"

const login = createAsyncThunk<undefined, LoginParamsType, {
    rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }
}>("auth/auth",
    async (param, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        try {
            const res = await authAPI.login(param)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
                return
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

const logout = createAsyncThunk("auth/logout",
    async (param, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        try {
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
                return;
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

export const asyncActions = {login, logout}

export const slice = createSlice({
    name: "auth",
    initialState: {
        isLoggedIn: false
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<{ value: boolean }>) {
            state.isLoggedIn = action.payload.value
        }
    },
    extraReducers: builder => {
        builder.addCase(login.fulfilled, (state) => {
            state.isLoggedIn = true
        })
        builder.addCase(logout.fulfilled, (state) => {
            state.isLoggedIn = false
        })
    }
})
