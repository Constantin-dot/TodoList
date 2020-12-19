import {combineReducers} from "redux"
import {todoListsReducer} from "../features/todoLists"
import thunkMiddleware from "redux-thunk"
import {authReducer} from "../features/auth"
import {configureStore} from "@reduxjs/toolkit"
import { applicationReducer } from "../features/application"
import {tasksReducer} from "../features/tasks";

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    application: applicationReducer,
    auth: authReducer
})

// export const  store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store