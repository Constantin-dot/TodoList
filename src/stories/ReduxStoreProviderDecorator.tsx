import {Provider} from "react-redux";
import {AppRootState} from "../app/store";
import React from "react";
import {todoListsReducer} from "../features/TodoLists/todoLists-reducer";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import {applyMiddleware, combineReducers, createStore} from "redux";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {appReducer} from "../app/app-reducer";
import thunk from "redux-thunk";
import {authReducer} from "../features/login/auth-reducer";

const rootReducer = combineReducers({
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
        status: "idle",
        isInitialized: true
    },
    auth: {
        isLoggedIn: true
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}