import {todoListsAPI, TodoListType} from "../../api/todoLists-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatusAC, setAppStatusActionType} from "../../app/app-reducer";

const initialState: Array<TodoListDomainType> = [];

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.todoListId)
        case 'ADD-TODOLIST':
            return [{...action.todoList, filter: "all", entityStatus: "idle"}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case "SET-TODOLISTS":
            return action.todoLists.map(tl => ({...tl, filter: "all", entityStatus: "idle"}))
        default:
            return state;
    }
};

// Actions
export const removeTodoListAC = (todoListId: string) => ({type: 'REMOVE-TODOLIST', todoListId} as const)

export const addTodoListAC = (todoList: TodoListType) => ({type: "ADD-TODOLIST", todoList} as const);

export const changeTodoListTitleAC = (id: string, title: string) =>
    ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)

export const changeTodoListFilterAC = (filter: FilterValuesType, id: string) =>
    ({type: 'CHANGE-TODOLIST-FILTER', filter, id} as const)

export const changeTodoListEntityStatusAC = (id: string, entityStatus: RequestStatusType) =>
    ({type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const)

export const setTodoListsAC = (todoLists: Array<TodoListType>) => ({type: 'SET-TODOLISTS', todoLists} as const)

// Thunks
export const fetchTodoListsTC = () => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    todoListsAPI.getTodoLists()
        .then((res) => {
            dispatch(setTodoListsAC(res.data))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const removeTodoListTC = (todoListId: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodoListEntityStatusAC(todoListId, 'loading'))
    todoListsAPI.deleteTodoList(todoListId)
        .then((res) => {
            dispatch(removeTodoListAC(todoListId))
            dispatch(setAppStatusAC('succeeded'))
        })
}
export const addTodoListTC = (title: string) => (dispatch: Dispatch<ActionType>) => {
    dispatch(setAppStatusAC('loading'));
    todoListsAPI.createTodoList(title)
        .then((res) => {
            dispatch(addTodoListAC(res.data.data.item))
            dispatch(setAppStatusAC('succeeded'));
        })
}
export const changeTodoListTitleTC = (id: string, title: string) => (dispatch: Dispatch<ActionType>) => {
    todoListsAPI.updateTodoList(id, title)
        .then((res) => {
            dispatch(changeTodoListTitleAC(id, title))
        })
}

// Types
type ActionType = ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTodoListTitleAC>
    | ReturnType<typeof changeTodoListFilterAC>
    | ReturnType<typeof setTodoListsAC>
    | setAppStatusActionType
    | ReturnType<typeof changeTodoListEntityStatusAC>

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
