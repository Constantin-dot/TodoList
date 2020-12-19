import {todoListsAPI} from "../../api/todoLists-api"
import {RequestStatusType} from "../application/application-reducer"
import {applicationActions} from "../application"
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {
    handleAsyncServerAppError,
    handleAsyncServerNetworkError
} from "../../utils/errorUtils"
import {ThunkError} from "../../utils/types"
import {TodoListType} from "../../api/types"

const fetchTodoLists = createAsyncThunk<{ todoLists: TodoListType[] }, undefined, ThunkError>("todoLists/fetchTodolists",
    async (param, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        const res = await todoListsAPI.getTodoLists()
        try {
            thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
            return {todoLists: res.data}
        } catch (error) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

const addTodoList = createAsyncThunk<{ todoList: TodoListType }, string, ThunkError>
    ("todoLists/addTodolist",
    async (title, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        const res = await todoListsAPI.createTodoList(title)
        try {
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
                return {todoList: res.data.data.item}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI, false)
            }
        }
        catch (err) {
            return handleAsyncServerNetworkError(err, thunkAPI)
        }
    })

const removeTodoList = createAsyncThunk<{ todoListId: string }, string, ThunkError
    >("todoLists/removeTodolist", async (todoListId, thunkAPI) => {
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'loading'}))
        thunkAPI.dispatch(changeTodoListEntityStatus({id: todoListId, entityStatus: 'loading'}))
        await todoListsAPI.deleteTodoList(todoListId)
        thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
        return {todoListId: todoListId}
    })

const changeTodoListTitle = createAsyncThunk<{id: string, title: string}, {id: string, title: string}, ThunkError
    >("todoLists/changeTodoListTitle",
    async (param, thunkAPI) => {
        try {
            const res = await todoListsAPI.updateTodoList(param.id, param.title)
            if (res.data.resultCode === 0) {
                thunkAPI.dispatch(applicationActions.setAppStatus({status: 'succeeded'}))
                return {id: param.id, title: param.title}
            } else {
                return handleAsyncServerAppError(res.data, thunkAPI)
            }
        } catch (error) {
            return handleAsyncServerNetworkError(error, thunkAPI)
        }
    })

export const asyncActions = {
    fetchTodoLists,
    removeTodoList,
    addTodoList,
    changeTodoListTitle
}

export const slice = createSlice({
    name: "todoLists",
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodoListFilter(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatus(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoLists.fulfilled,
            (state, action) => {
                return action.payload.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
            })
        builder.addCase(removeTodoList.fulfilled,
            (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoListId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
        builder.addCase(addTodoList.fulfilled,
            (state, action) => {
            state.unshift({...action.payload.todoList, filter: "all", entityStatus: "idle"})
            })
        builder.addCase(changeTodoListTitle.fulfilled,
            (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })
    }
})

export const {changeTodoListFilter, changeTodoListEntityStatus} = slice.actions

// Types
export type FilterValuesType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
