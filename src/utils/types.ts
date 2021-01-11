import {FieldErrorType} from "../api/types"
import {store} from "../app/store"
import {rootReducer} from "../app/reducers";

export type RootReducerType = typeof rootReducer

export type AppRootState = ReturnType<RootReducerType>

export type AppDispatchType = typeof  store.dispatch

export type ThunkError = {rejectValue: { errors: Array<string>, fieldsErrors?: Array<FieldErrorType> }}