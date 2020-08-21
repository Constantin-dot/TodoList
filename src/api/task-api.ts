import axios from "axios";

const instance= axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "api-key": "412171fb-414b-4486-844b-64550797222a"
    }
})

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedData: string
}

type GetTasksResponseType = {
    error: null | string
    items: TaskType[]
    totalCount: number
}

type CommonTasksResponseType<D={}> = {
    resultCode: number
    messages: string[],
    data: D
}

export  const taskApi = {
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<CommonTasksResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks`, {title: title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<CommonTasksResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(todoListId: string, taskId: string, title: string) {
        return instance.put<CommonTasksResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`, {title: title})
    },
}