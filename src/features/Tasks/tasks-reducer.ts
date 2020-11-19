import {addTodoListTC, fetchTodoListsTC, removeTodoListTC} from "../TodoLists/todoLists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/tasks-api";
import {AppRootState} from "../../app/store";
import {setAppStatusAC} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/errorUtils";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

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

export const addTaskTC = createAsyncThunk("tasks/addTask",
    async (param: { title: string, todoListId: string }, {dispatch, rejectWithValue}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        try {
            const res = await tasksAPI.createTask(param.todoListId, param.title)
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return res.data.data.item
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })

export const updateTaskTC = createAsyncThunk("tasks/updateTask",
    async (param: { taskId: string, model: UpdateDomainTaskModelType, todoListId: string },
           {dispatch, rejectWithValue, getState}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const state = getState() as AppRootState
        const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
        if (!task) {
            return rejectWithValue("task not found in the state")
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            ...param.model
        }
        const res = await tasksAPI.updateTask(param.taskId, apiModel, param.todoListId)
        try {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC({status: 'succeeded'}))
                return param
            } else {
                handleServerAppError(res.data, dispatch)
                return rejectWithValue(null)
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch)
            return rejectWithValue(null)
        }
    })

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addTodoListTC.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(removeTodoListTC.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(fetchTodoListsTC.fulfilled, (state, action) => {
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
        builder.addCase(addTaskTC.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        })
        builder.addCase(updateTaskTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

export const tasksReducer = slice.reducer

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
