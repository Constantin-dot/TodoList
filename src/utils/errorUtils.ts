import {setAppErrorAC, setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../app/app-reducer";
import {CommonTasksResponseType} from "../api/tasks-api";
import {Dispatch} from "redux";

export const handleServerAppError = <D>(data: CommonTasksResponseType<D>, dispatch: Dispatch<setAppErrorActionType
    | setAppStatusActionType>) => {
        if(data.messages.length) {
            dispatch(setAppErrorAC(data.messages[0]))
        } else {
            dispatch(setAppErrorAC("Some error occurred"))
        }
        dispatch(setAppStatusAC('failed'))
    }

export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch<setAppErrorActionType
    | setAppStatusActionType>) => {
        dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
        dispatch(setAppStatusAC('failed'))
    }