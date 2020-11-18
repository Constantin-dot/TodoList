import {combineReducers} from "redux";
import {todoListsReducer} from "../features/TodoLists/todoLists-reducer";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import thunkMiddleware from "redux-thunk";
import {appReducer} from "./app-reducer";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer
})

export type RootReducerType = typeof rootReducer

export type AppRootState = ReturnType<RootReducerType>;

// export const  store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store;

type AppDispatchType = typeof  store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatchType>()