import * as applicationSelectors from './selectors'
import {asyncActions as applicationAsyncActions} from "./application-reducer";
import {slice} from "./application-reducer"

const applicationReducer = slice.reducer

const applicationActions = {
    ...slice.actions,
    ...applicationAsyncActions
}

export {
    applicationSelectors,
    applicationReducer,
    applicationActions
}