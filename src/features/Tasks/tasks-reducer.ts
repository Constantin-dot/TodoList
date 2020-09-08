import {
    addTodoListAC,
    removeTodoListAC,
    setTodoListsAC
} from "../TodoLists/todoLists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {setAppErrorActionType, setAppStatusAC, setAppStatusActionType} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";

export const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId)}
        case "ADD-TASK":
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        case "UPDATE-TASK":
            return {...state, [action.todoListId]: state[action.todoListId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case "ADD-TODOLIST":
            return {...state, [action.todoList.id]: []}
        case "REMOVE-TODOLIST":
            const stateCopy = {...state};
            delete stateCopy[action.todoListId];
            return stateCopy;
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        case "SET-TASKS":
            return {...state, [action.todoListId]: action.tasks}
        default:
            return state;
    }
}

// Actions
export const removeTaskAC = (todoListId: string, taskId: string) =>
    ({type: 'REMOVE-TASK', todoListId, taskId} as const)

export const addTaskAC = (task: TaskType) => ({type: "ADD-TASK", task} as const)

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string) =>
    ({type: "UPDATE-TASK", taskId, model, todoListId} as const)

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string) =>
    ({type: "SET-TASKS", tasks, todoListId} as const)

// Thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC(res.data.items, todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC(todoListId, taskId))
                dispatch(setAppStatusAC('succeeded'))
            } else if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch<ActionType> ) => {
    dispatch(setAppStatusAC('loading'))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            } else if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppRootState) => {
        dispatch(setAppStatusAC('loading'))
        const state = getState();
        const task = state.tasks[todoListId].find(t => t.id === taskId);
        if (!task) {
            console.warn("task not found in the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            ...domainModel
        }
        tasksAPI.updateTask(taskId, apiModel, todoListId)
            .then(res => {
                if(res.data.resultCode === 0) {
                    dispatch(updateTaskAC(taskId, domainModel, todoListId))
                    dispatch(setAppStatusAC('succeeded'))
                } else if (res.data.resultCode === 1) {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

// Types
export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
type ActionType = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof setTodoListsAC>
    | ReturnType<typeof setTasksAC>
    | setAppErrorActionType
    | setAppStatusActionType

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
