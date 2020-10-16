import {setAppErrorAC,  setAppStatusAC} from "../app/app-reducer";
import {CommonResponseType} from "../api/tasks-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: CommonResponseType<D>, dispatch: Dispatch) => {
        if(data.messages.length) {
            dispatch(setAppErrorAC({error: data.messages[0]}))
        } else {
            dispatch(setAppErrorAC({error: "Some error occurred"}))
        }
        dispatch(setAppStatusAC({status: 'failed'}))
    }

export const handleServerNetworkError = (error: { message: string}, dispatch: Dispatch) => {
        dispatch(setAppErrorAC({error: error.message ? error.message : "Some error occurred"}))
        dispatch(setAppStatusAC({status: 'failed'}))
    }
