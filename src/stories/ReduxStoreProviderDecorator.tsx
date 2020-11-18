import {Provider} from "react-redux";
import {AppRootState, RootReducerType} from "../app/store";
import React from "react";
import {todoListsReducer} from "../features/TodoLists/todoLists-reducer";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import {combineReducers} from "redux";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {appReducer} from "../app/app-reducer";
import {authReducer} from "../features/login/auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import {HashRouter} from "react-router-dom";

const rootReducer: RootReducerType = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
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
    app: {
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
