import {Provider} from "react-redux"
import React from "react"
import {todoListsReducer} from "../features/todoLists"
import {tasksReducer} from "../features/tasks"
import {combineReducers} from "redux"
import {TaskPriorities, TaskStatuses} from "../api/types"
import {applicationReducer} from "../features/application"
import {authReducer} from "../features/auth"
import {configureStore} from "@reduxjs/toolkit"
import thunkMiddleware from "redux-thunk"
import {HashRouter} from "react-router-dom"
import {AppRootState, RootReducerType} from "../utils/types";

const rootReducer: RootReducerType = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    application: applicationReducer,
    auth: authReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle"},
        {id: "todoListId2", title: "What to buy", filter: "all", order: 1, addedDate: "", entityStatus: "loading"},
    ],
    tasks: {
        ["todoListId1"]: [
            {id: "task1", title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: "task2", title: "JS",status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: "task3", title: "ReactJS", status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: "task4", title: "Redux", status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
        ],
        ["todoListId2"]: [
            {id: "task1", title: "Book", status: TaskStatuses.Completed,
                todoListId: "todoListId2", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: "task2", title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todoListId2", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: "task3", title: "apples", status: TaskStatuses.Completed,
                todoListId: "todoListId2", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
        ]
    },
    application: {
        error: null,
        status: "succeeded",
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunkMiddleware)
})

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}

export const BrowserRouterDecorator = (storyFn: any) => (
    <HashRouter>
        {storyFn()}
    </HashRouter>)
