import {applicationActions} from "../features/application"
import {Dispatch} from "redux"
import {AxiosError} from "axios"
import {FieldErrorType} from "../api/types"

type ResponseType<D = {}> = {
    resultCode: number
    fieldsErrors?: Array<FieldErrorType>
    messages: Array<string>
    data: D
}

type ThunkAPIType = {
    dispatch: (action: any) => any
    rejectWithValue: Function
}

export const handleServerAppError = <D>(data: ResponseType<D>, dispatch: Dispatch, showError = true) => {
    if(showError) {
        dispatch(applicationActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    dispatch(applicationActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: AxiosError,
                                         dispatch: Dispatch,
                                         showError = true) => {
    if (showError) {
        dispatch(applicationActions.setAppError({error: error.message ? error.message : "Some error occurred"}))
    }
    dispatch(applicationActions.setAppStatus({status: 'failed'}))
}

export const handleAsyncServerAppError = <D>(data: ResponseType<D>,
                                             thunkAPI: ThunkAPIType,
                                             showError = true) => {
    if(showError) {
        thunkAPI.dispatch(applicationActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    thunkAPI.dispatch(applicationActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: data.messages, fieldsErrors: data.fieldsErrors})
}

export const handleAsyncServerNetworkError = (error: AxiosError,
                                              thunkAPI: ThunkAPIType,
                                              showError = true) => {
    if (showError) {
        thunkAPI.dispatch(applicationActions.setAppError({error: error.message ? error.message : "Some error occurred"}))
    }
    thunkAPI.dispatch(applicationActions.setAppStatus({status: 'failed'}))
    return thunkAPI.rejectWithValue({errors: [error.message], fieldsErrors: undefined})
}
