import axios from "axios";

type TodoType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T={}> = {
    resultCode: number
    messages: Array<string>
    data: T
}

const instance= axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "412171fb-414b-4486-844b-64550797222a"
    }
})

export const todoListApi = {
    getTodoLists() {
        return instance.get<Array<TodoType>>("todo-lists")
    },
    createTodoList(title: string) {
        return instance.post<CommonResponseType<{item: TodoType}>>("todo-lists",  {title: title})
    },
    deleteTodoList(todoListId: string) {
        return instance.delete<CommonResponseType>("todo-lists/" + todoListId)
    },
    updateTodoListTitle(todoListId: string, title:string) {
        return instance.put<CommonResponseType>("todo-lists/" + todoListId, {title: title})
    }
}