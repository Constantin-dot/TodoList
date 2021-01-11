import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    UpdateTaskModelType
} from "../../api/types"
import {asyncActions as todoListsAsyncActions} from "../todoLists/todoLists-reducer"
import {applicationActions} from "../application"
import {handleAsyncServerAppError, handleAsyncServerNetworkError} from "../../utils/errorUtils"
import {AppRootState, ThunkError} from "../../utils/types"
import {tasksAPI} from "../../api/tasks-api"

const fetchTasks = createAsyncThunk<{tasks: TaskType[], todoListId: string}, string, ThunkError>("tasks/fetchTasks",
    async (todoListId, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        try {
            const res = await tasksAPI.getTasks(todoListId)
            const tasks = res.data.items
            thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
            return {tasks, todoListId}
        } catch (error) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

const addTask = createAsyncThunk<
    TaskType, { title: string, todoListId: string },
    ThunkError>("tasks/addTask",
    async (param, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        try {
            const res = await tasksAPI.createTask(param.todoListId, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
                return res.data.data.item
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        } catch (err) {
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    })

const removeTask = createAsyncThunk<{todoListId: string, taskId: string}, {todoListId: string, taskId: string}, ThunkError>("tasks/removeTask",
    async (param, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        try {
            const res = await tasksAPI.deleteTask(param.todoListId, param.taskId)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
                return {todoListId: param.todoListId, taskId: param.taskId}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {
            return handleAsyncServerAppError(error, thunkAPI)
        }
    })

const updateTask = createAsyncThunk("tasks/updateTask",
    async (param: { taskId: string, model: UpdateDomainTaskModelType, todoListId: string } , thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        const state = thunkAPI.getState() as AppRootState
        const task = state.tasks[param.todoListId].find(t => t.id === param.taskId)
        if (!task) {
            return thunkAPI.rejectWithValue("task not found in the state")
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
                thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
                return param
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

export const asyncActions = {
    fetchTasks,
    removeTask,
    addTask,
    updateTask
}

export const initialState: TasksStateType = {};

export const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(todoListsAsyncActions.addTodoList.fulfilled, (state, action) => {
            state[action.payload.todoList.id] = []
        })
        builder.addCase(todoListsAsyncActions.removeTodoList.fulfilled, (state, action) => {
            delete state[action.payload.todoListId]
        })
        builder.addCase(todoListsAsyncActions.fetchTodoLists.fulfilled, (state, action) => {
            action.payload.todoLists.forEach(tl => {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {
            if (action.payload) {
                state[action.payload.todoListId] = action.payload.tasks
            }
        })
        builder.addCase(removeTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks.splice(index, 1)
            }
        })
        builder.addCase(addTask.fulfilled, (state, action) => {
            state[action.payload.todoListId].unshift(action.payload);
        })
        builder.addCase(updateTask.fulfilled, (state, action) => {
            const tasks = state[action.payload.todoListId]
            const index = tasks.findIndex(t => t.id === action.payload.taskId)
            if (index > -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        })
    }
})

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