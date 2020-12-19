import {asyncActions as tasksAsyncActions} from './tasks-reducer'
import {slice} from './tasks-reducer'

const tasksActions = {
    ...tasksAsyncActions
}

const tasksReducer = slice.reducer


export {
    tasksActions,
    tasksReducer
}