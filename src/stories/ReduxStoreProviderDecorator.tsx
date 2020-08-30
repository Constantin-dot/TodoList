import {Provider} from "react-redux";
import {AppRootState} from "../state/store";
import React from "react";
import {v1} from "uuid";
import {todoListsReducer} from "../state/todoLists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import {combineReducers, createStore} from "redux";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer
})

const initialGlobalState: AppRootState = {
    todoLists: [
        {id: "todoListId1", title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: "todoListId2", title: "What to buy", filter: "all", order: 1, addedDate: ""},
    ],
    tasks: {
        ["todoListId1"]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "JS",status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "ReactJS", status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "Redux", status: TaskStatuses.Completed,
                todoListId: "todoListId1", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
        ],
        ["todoListId2"]: [
            {id: v1(), title: "Book", status: TaskStatuses.Completed,
                todoListId: "todoListId2", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: "todoListId2", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "apples", status: TaskStatuses.Completed,
                todoListId: "todoListId2", startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
        ]
    }
}

export const storyBookStore = createStore(rootReducer, initialGlobalState);

export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>
        {storyFn()}
    </Provider>
}