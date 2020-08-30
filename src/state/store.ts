import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";
import thunk from "redux-thunk";

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

export type AppRootState = ReturnType<typeof rootReducer>;

export const  store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;