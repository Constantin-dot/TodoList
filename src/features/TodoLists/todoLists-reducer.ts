import {todoListsAPI, TodoListType} from "../../api/todoLists-api";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/errorUtils";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export const fetchTodoListsTC = createAsyncThunk("todoLists/fetchTodolists",
    async (param, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todoListsAPI.getTodoLists()
        try {
            thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {todoLists: res.data}
        } catch (error) {
            handleServerNetworkError(error, thunkAPI.dispatch)
            return thunkAPI.rejectWithValue(null)
        }
    })

export const removeTodoListTC = createAsyncThunk("todoLists/removeTodolist",
    async (todoListId: string, thunkAPI) => {
        thunkAPI.dispatch(setAppStatusAC({status: 'loading'}))
        thunkAPI.dispatch(changeTodoListEntityStatusAC({id: todoListId, entityStatus: 'loading'}))
        const res = await todoListsAPI.deleteTodoList(todoListId)
        thunkAPI.dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoListId: todoListId}
    })

export const addTodoListTC = createAsyncThunk("todoLists/addTodolist",
    async (title: string, {dispatch}) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        const res = await todoListsAPI.createTodoList(title)
        dispatch(setAppStatusAC({status: 'succeeded'}))
        return {todoList: res.data.data.item}
    })

export const changeTodoListTitleTC = createAsyncThunk("todoLists/changeTodoListTitle",
    async (param: {id: string, title: string}, {dispatch}) => {
        await todoListsAPI.updateTodoList(param.id, param.title)
        return {id: param.id, title: param.title}
    })


const slice = createSlice({
    name: "todoLists",
    initialState: [] as Array<TodoListDomainType>,
    reducers: {
        changeTodoListFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchTodoListsTC.fulfilled,
            (state, action) => {
                return action.payload.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
            })
        builder.addCase(removeTodoListTC.fulfilled,
            (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.todoListId)
                if (index > -1) {
                    state.splice(index, 1)
                }
            })
        builder.addCase(addTodoListTC.fulfilled,
            (state, action) => {
            state.unshift({...action.payload.todoList, filter: "all", entityStatus: "idle"})
            })
        builder.addCase(changeTodoListTitleTC.fulfilled,
            (state, action) => {
                const index = state.findIndex(tl => tl.id === action.payload.id)
                state[index].title = action.payload.title
            })
    }
})

export const todoListsReducer = slice.reducer
export const {changeTodoListFilterAC, changeTodoListEntityStatusAC} = slice.actions

// Types
export type FilterValuesType = "all" | "completed" | "active"
export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
