import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "412171fb-414b-4486-844b-64550797222a"
    }
})

// api
export const todoListsAPI = {
    getTodoLists() {
        return instance.get<Array<TodoListType>>(`todo-lists`)
    },
    createTodoList(title: string) {
        return  instance.post<CommonTodoListResponseType<{item: TodoListType}>>(`todo-lists`, {title: title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<CommonTodoListResponseType>(`todo-lists/${todoListId}`)
    },
    updateTodoList(todoListId: string, title: string) {
        return instance.put<CommonTodoListResponseType>(`todo-lists/${todoListId}`, {title: title})
    }
}

// types
export type TodoListType = {
    id: string
    title: string
    addedDate: string
    order: number
}

export type CommonTodoListResponseType<D = {}> = {
    resultCode: number
    message: Array<string>
    data: D
}