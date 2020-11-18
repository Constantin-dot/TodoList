import {todoListsAPI, TodoListType} from "../../api/todoLists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC} from "../../app/app-reducer";
import {handleServerNetworkError} from "../../utils/errorUtils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: Array<TodoListDomainType> = [];

const slice = createSlice({
    name: "todoLists",
    initialState: initialState,
    reducers: {
        removeTodoListAC(state, action: PayloadAction<{ todoListId: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.todoListId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        addTodoListAC(state, action: PayloadAction<{ todoList: TodoListType }>) {
            state.unshift({...action.payload.todoList, filter: "all", entityStatus: "idle"})
        },
        changeTodoListTitleAC(state, action: PayloadAction<{ id: string, title: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].title = action.payload.title
        },
        changeTodoListFilterAC(state, action: PayloadAction<{ filter: FilterValuesType, id: string }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].filter = action.payload.filter
        },
        changeTodoListEntityStatusAC(state, action: PayloadAction<{ id: string, entityStatus: RequestStatusType }>) {
            const index = state.findIndex(tl => tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        },
        setTodoListsAC(state, action: PayloadAction<{ todoLists: Array<TodoListType> }>) {
            return action.payload.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        }
    }
})

export const todoListsReducer = slice.reducer
export const {removeTodoListAC, addTodoListAC, changeTodoListTitleAC,
    changeTodoListFilterAC, changeTodoListEntityStatusAC, setTodoListsAC} = slice.actions

// Thunks
export const fetchTodoListsTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC({todoLists: res.data}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
        .catch(error => {
            handleServerNetworkError(error, dispatch)
        })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}))
    dispatch(changeTodoListEntityStatusAC({id: todoListId, entityStatus: 'loading'}))
    todoListsAPI.deleteTodoList(todoListId)
        .then((res) => {
            dispatch(removeTodoListAC({todoListId: todoListId}))
            dispatch(setAppStatusAC({status: 'succeeded'}))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status: 'loading'}));
    todoListsAPI.createTodoList(title)
        .then((res) => {
            dispatch(addTodoListAC({todoList: res.data.data.item}))
            dispatch(setAppStatusAC({status: 'succeeded'}));
        })
}
export const changeTodoListTitleTC = (id: string, title: string) => (dispatch: Dispatch) => {
    todoListsAPI.updateTodoList(id, title)
        .then((res) => {
            dispatch(changeTodoListTitleAC({id: id, title: title}))
        })
}

// Types
export type FilterValuesType = "all" | "completed" | "active";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
