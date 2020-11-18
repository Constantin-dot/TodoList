import {addTodoListAC, removeTodoListAC, setTodoListsAC} from "../TodoLists/todoLists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const initialState: TasksStateType = {};

export const fetchTasksTC = createAsyncThunk("tasks/fetchTasks",
    async (todoListId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await tasksAPI.getTasks(todoListId)
            const tasks = res.data.items
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {tasks, todoListId}
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
        }
    })

export const removeTaskTC = createAsyncThunk("tasks/removeTask",
    async (param: { todoListId: string, taskId: string }, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await tasksAPI.deleteTask(param.todoListId, param.taskId)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {todoListId: param.todoListId, taskId: param.taskId}
            } else {
                handleServerAppError(res.data, thunkAPI.dispatch)
                return {todoListId: param.todoListId, taskId: param.taskId}
            }
        } catch (error) {
            handleServerAppError(error, thunkAPI.dispatch)
            return {todoListId: param.todoListId, taskId: param.taskId}
        }
    })

export const addTaskTC = (title: string, todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    tasksAPI.createTask(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item))
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
                if (res.data.resultCode === 0) {
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


const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<TaskType>) {
            state[action.payload.todoListId].unshift(action.payload);
        },
        updateTaskAC(state, action: PayloadAction<{ taskId: string, model: UpdateDomainTaskModelType, todoListId: string }>) {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addTodoListAC, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListAC, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(setTodoListsAC, (state, action) => {
            action.payload.todoLists.forEach((tl: any) => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todoListId] = action.payload.tasks
            }
        })
        builder.addCase(removeTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
    }
})

export const tasksReducer = slice.reducer
export const {addTaskAC, updateTaskAC} = slice.actions

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
