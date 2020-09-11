import {Dispatch} from "redux";
import {authAPI} from "../api/auth-api";
import {setIsLoggedInAC} from "../features/login/auth-reducer";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SER-ERROR':
            return {...state, error: action.error}
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return state
    }
}
// actions
export const setAppErrorAC = (error: string | null) => ({type: "APP/SER-ERROR", error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value} as const)

// thunks
export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0){
            dispatch(setIsLoggedInAC(true))

        } else {

        }
        dispatch(setAppIsInitializedAC(true))
    })
}

// types
type ActionsType = setAppErrorActionType
    | setAppStatusActionType
    | setAppInitializedActionType
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type setAppInitializedActionType = ReturnType<typeof setAppIsInitializedAC>
export type InitialStateType = {
    status: RequestStatusType
    error: string | null
    isInitialized: boolean
}