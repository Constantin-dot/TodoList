import axios from "axios"
import {CommonResponseType, GetTasksResponseType, TaskType, UpdateTaskModelType} from "./types"

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "412171fb-414b-4486-844b-64550797222a"
    }
})

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
