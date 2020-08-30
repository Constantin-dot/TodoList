import {todoListsAPI, TodoListType} from "../api/todoLists-api";
import {Dispatch} from "redux";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    todoList: TodoListType
}

export type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

export type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
}

export type SetTodoListsActionType = {
    type: 'SET-TODOLISTS'
    todoLists: Array<TodoListType>
}

type ActionType = RemoveTodoListActionType | AddTodoListActionType |
    ChangeTodoListTitleActionType | ChangeTodoListFilterActionType |
    SetTodoListsActionType;

export type FilterValuesType = "all" | "completed" | "active";

export type TodoListDomainType = TodoListType & {
    filter: FilterValuesType
}

const initialState: Array<TodoListDomainType> = [];

export const todoListsReducer = (state: Array<TodoListDomainType> = initialState, action: ActionType): Array<TodoListDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            const newTodoList: TodoListDomainType = {...action.todoList, filter: "all"}
            return [ newTodoList, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todoList = state.find(tl => tl.id === action.id)
            if (todoList) {
                todoList.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS": {
            return action.todoLists.map(tl => {
                return {
                    ...tl,
                    filter: "all"
                }
            })
        }
        default:
            return state;
    }
};

export const removeTodoListAC = (todoListId: string): RemoveTodoListActionType => {
    return { type: 'REMOVE-TODOLIST', id: todoListId};
};

export const addTodoListAC = (todoList: TodoListType): AddTodoListActionType => {
    return { type: "ADD-TODOLIST", todoList};
};

export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title,};
};

export const changeTodoListFilterAC = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id};
};

export const setTodoListsAC = (todoLists: Array<TodoListType>): SetTodoListsActionType => {
    return { type: 'SET-TODOLISTS', todoLists};
};

export const fetchTodoListsTC = () => {
    return (dispatch: Dispatch) => {
        todoListsAPI.getTodoLists()
            .then((res) => {
                dispatch(setTodoListsAC(res.data))
            })
    }
}

export const removeTodoListTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.deleteTodoList(todoListId)
            .then((res) => {
                dispatch(removeTodoListAC(todoListId))
            })
    }
}

export const addTodoListTC = (title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.createTodoList(title)
            .then((res) => {
                dispatch(addTodoListAC(res.data.data.item))
            })
    }
}

export const changeTodoListTitleTC = (id: string, title: string) => {
    return (dispatch: Dispatch) => {
        todoListsAPI.updateTodoList(id, title)
            .then((res) => {
                dispatch(changeTodoListTitleAC(id, title))
            })
    }
}