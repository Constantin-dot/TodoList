import {Dispatch} from "redux";
import {setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/auth-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

export const initialState: LoginStateType = {
    isLoggedIn: false
}

export const authReducer = (state: LoginStateType = initialState, action: ActionType): LoginStateType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state;
    }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
    ({type: 'login/SET-IS-LOGGED-IN', value} as const)
// thunks
export const loginTC = (data: LoginParamsType) =>
    (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(data)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(true))
                    dispatch(setAppStatusAC('succeeded'))
                } else if (res.data.resultCode === 1) {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }

export const logoutTC = () =>
    (dispatch: Dispatch<ActionType>) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(setIsLoggedInAC(false))
                    dispatch(setAppStatusAC('succeeded'))
                } else if (res.data.resultCode === 1) {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
// types
type LoginStateType = {
    isLoggedIn: boolean
}
type ActionType = ReturnType<typeof setIsLoggedInAC>
    | setAppErrorActionType
    | setAppStatusActionType
