import {TasksStateType} from "../App";
import {v1} from "uuid";

type ActionType = RemoveTaskActionType | AddTaskActionType |
    ChangeTaskStatusActionType | ChangeTaskTitleActionType |
     AddTodolistActionType | RemoveTodolistActionType;

export type RemoveTaskActionType = {
    type: "REMOVE-TASK",
    taskId: string,
    todolistId: string,
}
export type AddTaskActionType = {
    type: "ADD-TASK",
    title: string,
    todolistId: string,
}
export type ChangeTaskStatusActionType = {
    type: "CHANGE-TASK-STATUS",
    id: string,
    isDone: boolean,
    todolistId: string
}
export type ChangeTaskTitleActionType = {
    type: "CHANGE-TASK-TITLE",
    id: string,
    title: string,
    todolistId: string
}
export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistId: string
}

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    let stateCopy = {...state};
    switch (action.type) {
        case "REMOVE-TASK":
            stateCopy[action.todolistId] = stateCopy[action.todolistId].filter(task =>
                task.id !== action.taskId
            );
            return stateCopy;
        case "ADD-TASK":
            let newTask = {id: v1(), title: action.title, isDone: false};
            stateCopy[action.todolistId] = [newTask, ...stateCopy[action.todolistId]];
            return stateCopy;
        case "CHANGE-TASK-STATUS":
            return {...state, [action.todolistId]: [...state[action.todolistId].map(task => {
                if(task.id !== action.id) {
                    return {...task};
                } else {
                    return {...task, isDone: action.isDone};
                }
                })]
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state, [action.todolistId]: [...state[action.todolistId].map(task => {
                    if (task.id !== action.id) {
                        return {...task};
                    } else {
                        return {...task, title: action.title};
                    }
                })]
            }
        case 'ADD-TODOLIST': {
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }
        case 'REMOVE-TODOLIST':
            delete stateCopy[action.id]
            return stateCopy;
        default:
            throw new Error("I don't understand this type")
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId, todolistId};
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return {type: "ADD-TASK", title, todolistId};
}

export const changeTaskStatusAC = (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return {type: "CHANGE-TASK-STATUS", id, isDone, todolistId };
}

export const changeTaskTitleAC = (id: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: "CHANGE-TASK-TITLE", id, title , todolistId };
}