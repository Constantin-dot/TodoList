import {combineReducers} from "redux"
import {todoListsReducer} from "../features/todoLists"
import {authReducer} from "../features/auth"
import { applicationReducer } from "../features/application"
import {tasksReducer} from "../features/tasks";
import {configureStore} from "@reduxjs/toolkit"
import thunkMiddleware from "redux-thunk"
import {rootReducer} from "./reducers";

// export const rootReducer = combineReducers({
//     todoLists: todoListsReducer,
//     tasks: tasksReducer,
//     application: applicationReducer,
//     auth: authReducer
// })

// export const  store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

// @ts-ignore
window.store = store

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer)
    })
}