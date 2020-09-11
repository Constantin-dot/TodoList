import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "../features/TodoLists/todoLists-reducer";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import thunk from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/login/auth-reducer";

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type AppRootState = ReturnType<typeof rootReducer>;

export const  store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;