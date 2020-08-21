import React, {useEffect, useState} from 'react';
import {todoListApi} from "../api/todoList-api";

export default {
    title: 'todoList-API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.getTodoLists()
            .then((response) => {
                let data = response.data;
                setState(data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.createTodoList("New todoList3")
            .then((response) => {
            let data = response.data;
            setState(data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.deleteTodoList("b3ce1410-ecf7-49f4-a657-a9bd6b7b113f")
            .then((response) => {
            let data = response.data;
            setState(data);
        })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListApi.updateTodoListTitle("b3ce1410-ecf7-49f4-a657-a9bd6b7b113f", "Vue")
            .then((response) => {
                let data = response.data;
                setState(data);
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
