import {asyncActions as todoListsAsyncActions} from './todoLists-reducer'
import {asyncActions as tasksAsyncActions} from '../tasks/tasks-reducer'
import {slice} from './todoLists-reducer'
import {TodolistsList} from './TodolistsList'

const todoListsActions = {
    ...todoListsAsyncActions,
    ...slice.actions
}

const tasksActions = {
    ...tasksAsyncActions
}
const todoListsReducer = slice.reducer

export {
    todoListsActions,
    tasksActions,
    TodolistsList,
    todoListsReducer
}