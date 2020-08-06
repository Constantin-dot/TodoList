import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todoLists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: "ADD-TASK"
    title: string
    todoListId: string
}

export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS"
    id: string
    isDone: boolean
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE"
    id: string
    title: string
    todoListId: string
}

type ActionType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
    AddTodolistActionType | RemoveTodolistActionType;

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type TasksStateType = {
    [key: string]: Array<TaskType>
}

let initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType= initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const stateCopy = {...state};
            const tasks = state[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK":{
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks];
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case "CHANGE-TASK-STATUS": {
            let todoListTasks = state[action.todoListId];
            state[action.todoListId] = todoListTasks
                .map(t => t.id === action.id
                    ? {...t, isDone: action.isDone}
                    : t);
            return ({...state});
        }
        case "CHANGE-TASK-TITLE": {
            let todoListTasks = state[action.todoListId];
            state[action.todoListId] = todoListTasks
                .map(t => t.id === action.id
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todoListId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todoListId};
};

export const addTaskAC = (title: string, todoListId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todoListId};
};

export const changeTaskStatusAC = (id: string, isDone: boolean, todoListId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id, isDone, todoListId };
};

export const changeTaskTitleAC = (id: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, title , todoListId };
};