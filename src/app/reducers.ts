import {combineReducers} from "redux";
import {todoListsReducer} from "../features/todoLists";
import {tasksReducer} from "../features/tasks";
import {applicationReducer} from "../features/application";
import {authReducer} from "../features/auth";

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    application: applicationReducer,
    auth: authReducer
})
