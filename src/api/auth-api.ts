import axios from "axios"
import {CommonResponseType, LoginParamsType} from "./types"

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        "API-KEY": "412171fb-414b-4486-844b-64550797222a"
    }
})

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<CommonResponseType<{userId?: number}>>(`auth/login`, data)
        return promise
    },
    me() {
        return instance.get<CommonResponseType<{id: number, email: string, login: number}>>(`auth/me`)
    },
    logout() {
        return instance.delete<CommonResponseType<{userId?: number}>>(`auth/login`)
    }
}
