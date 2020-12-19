import {slice, InitialStateType} from "./application-reducer"
import {applicationActions} from "./index"

const {reducer: applicationReducer} = slice
const {setAppStatus, setAppError} = applicationActions

let startState: InitialStateType

beforeEach(() => {
    startState = {
        error: null,
        status: "idle",
        isInitialized: false
    }
})

test('correct error message should be set', () => {
    const endState = applicationReducer(startState, setAppError({error: 'some error'}))

    expect(endState.error).toBe('some error')
})

test('correct error message should be set', () => {
    const endState = applicationReducer(startState, setAppStatus({status: 'loading'}))

    expect(endState.status).toBe('loading')
})