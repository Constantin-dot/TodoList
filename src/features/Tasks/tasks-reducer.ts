import {
    addTodoListAC,
    removeTodoListAC,
    setTodoListsAC
} from "../TodoLists/todoLists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: TasksStateType = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        removeTaskAC(state, action: PayloadAction<{ todoListId: string, taskId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id !== action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        },
        addTaskAC(state, action: PayloadAction<{ task: TaskType }>) {
            state[action.payload.task.todoListId].unshift(action.payload.task);
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id !== action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        },
        setTasksAC(state, action: PayloadAction<{ tasks: Array<TaskType>, todoListId: string }>) {
            state[action.payload.todoListId] = action.payload.tasks
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) =>{
            state[action.payload.todoList.id] = []
        });
        builder.addCase(removeTodoListAC, (state, action) =>{
            delete state[action.payload.todoListId]
        });
        builder.addCase(setTodoListsAC, (state, action) =>{
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        });
    }
})

export const tasksReducer = slice.reducer
export const {addTaskAC, removeTaskAC, setTasksAC, updateTaskAC} = slice.actions

// Thunks
export const fetchTasksTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.getTasks(todoListId)
        .then((res) => {
            dispatch(setTasksAC({tasks: res.data.items, todoListId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const removeTaskTC = (todoListId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.deleteTask(todoListId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTaskAC({todoListId, taskId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC({task: res.data.data.item}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            } else if (res.data.resultCode === 1) {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        dispatch(setAppStatusAC({status: 'loading'}))
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
                    dispatch(updateTaskAC({taskId, model: domainModel, todoListId}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
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

export type TasksStateType = {
    [key: string]: Array<TaskType>
}
