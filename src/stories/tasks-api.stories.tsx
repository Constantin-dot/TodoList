import React, {useEffect, useState} from "react";
import {taskApi} from "../api/task-api";

export default {
    title: 'task-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoListId = "3df28d00-cf0b-409a-a603-e3f690c0e61f";
        taskApi.getTasks(todoListId)
            .then((response) => {
                const data = response.data;
                setState(data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskApi.createTask("3df28d00-cf0b-409a-a603-e3f690c0e61f", "New task3")
            .then((response) => {
                const data = response.data;
                setState(data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskApi.deleteTask("3df28d00-cf0b-409a-a603-e3f690c0e61f", "e7654ea2-6767-4cf8-8303-f902cff79afa")
            .then((response) => {
                const data = response.data;
                setState(data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        taskApi.updateTask("3df28d00-cf0b-409a-a603-e3f690c0e61f", "ed60b701-58f0-4073-b0d8-9c3dc81c4aa3", "New Task 1.2")
            .then((response) => {
                const data = response.data;
                setState(data);
            })
    }, [])
    return <div> {JSON.stringify(state)}</div>
}