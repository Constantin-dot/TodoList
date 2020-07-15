import {TodoListType} from "../App";
import {v1} from "uuid";
import {FilterValueType} from "../Todolist";

type ActionType = RemoveTodolistActionType |
    AddTodolistActionType |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterActionType;

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
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


export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);
        case 'ADD-TODOLIST':
            let newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: "all",
            }
            return [...state, newTodoList];
        case 'CHANGE-TODOLIST-TITLE':
            let todoList = state.find(tl => tl.id === action.id);
            if(todoList) {
                todoList.title = action.title;
                return [...state];
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            // let todoLisT = state.find(tl => tl.id === action.id);
            // if(todoLisT) {
            //     todoLisT.filter = action.filter;
            //     return [...state];
            // }
            // return state;
            return state.map(tl => {
                if(tl.id === action.id) {
                    tl.filter = action.filter
                }
                return tl;
            });
        default:
            throw new Error("I don't understand this type")
    }
};