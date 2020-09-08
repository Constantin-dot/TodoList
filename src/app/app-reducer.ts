
const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SER-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppErrorAC = (error: string | null) => ({type: "APP/SER-ERROR", error} as const)
export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

type ActionsType = setAppErrorActionType
    | setAppStatusActionType

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'

export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppStatusActionType = ReturnType<typeof setAppStatusAC>

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    error: string | null
}