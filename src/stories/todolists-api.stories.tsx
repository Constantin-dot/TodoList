import React, {useEffect, useState} from "react";
import {todoListsAPI} from "../api/todoLists-api";

export default {
    title: 'todoLists-API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.getTodoLists()
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
       todoListsAPI.createTodoList("New todoList 1")
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)

    const deleteTodoList = () => {
        todoListsAPI.deleteTodoList("63ac31f2-3f2c-4504-bcdf-a89cd303bd04")
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <button onClick={deleteTodoList}>delete task</button>
        </div>
    </div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListsAPI.updateTodoList("216e6ad6-a0d1-41c3-84e1-3184c9e488fd", "New todoList 1.2")
            .then((res) => {
                setState(res.data);
            })
    }, [])

    return <div> {JSON.stringify(state)} </div>

}