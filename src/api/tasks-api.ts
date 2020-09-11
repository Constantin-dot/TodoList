import axios from "axios";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "412171fb-414b-4486-844b-64550797222a"
    }
})

// api
export const tasksAPI = {
    getTasks(todoListId: string) {
        return instance.get<GetTasksResponseType>(`todo-lists/${todoListId}/tasks`)
    },
    createTask(todoListId: string, title: string) {
        return instance.post<CommonResponseType<{item: TaskType}>>(`todo-lists/${todoListId}/tasks`, {title: title})
    },
    deleteTask(todoListId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`)
    },
    updateTask(taskId: string, model: UpdateTaskModelType, todoListId: string) {
        return instance.put<CommonResponseType<TaskType>>(`todo-lists/${todoListId}/tasks/${taskId}`, model)
    },
}

// types
export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Uregently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type GetTasksResponseType = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type CommonResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export type UpdateTaskModelType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}