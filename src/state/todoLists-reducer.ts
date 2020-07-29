import {TodoListType} from "../App";
import {FilterValueType} from "../Todolist";
import {v1} from "uuid";

type ActionType = RemoveTodolistActionType | AddTodolistActionType |
    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string,
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    title: string
    id: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    filter: FilterValueType
    id: string
}

const initialState: Array<TodoListType> = [];
// type InitialStateType = typeof initialState;

export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: "all",
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id);
            if(todoList) {
                todoList.title = action.title;
            }
            return [...state];
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => {
                if(tl.id === action.id) {
                    tl.filter = action.filter
                }
                return tl;
            });
        default:
            return [...state]
    }
};

export const RemoveTodolistAC = (todolistId1: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId1}
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
}

export const ChangeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId2, title: newTodolistTitle }
}

export const ChangeTodolistFilterAC = (newFilter: FilterValueType, todolistId2: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: newFilter, id: todolistId2}
}
