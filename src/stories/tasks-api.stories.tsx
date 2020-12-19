import React, { useState} from "react";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'tasks-API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todoListId, setTodoListId] = useState<string>("");

    const getTasks = () => {
        tasksAPI.getTasks(todoListId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todoListId"}
                value={todoListId}
                onChange={(e) => {setTodoListId(e.currentTarget.value)}}

            />
            <button onClick={getTasks}>get task</button>
        </div>
    </div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [todoListId, setTodoListId] = useState<string>("");

    const createTask = () => {
        tasksAPI.createTask(todoListId, taskTitle)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todoListId"}
                value={todoListId}
                onChange={(e) => {setTodoListId(e.currentTarget.value)}}

            />
            <input
                placeholder={"taskTitle"}
                value={taskTitle}
                onChange={(e) => {setTaskTitle(e.currentTarget.value)}}
            />
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>("");
    const [todoListId, setTodoListId] = useState<string>("");

    const deleteTask = () => {
        debugger
        tasksAPI.deleteTask(todoListId,taskId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div> {JSON.stringify(state)}
        <div>
            <input
                placeholder={"todoListId"}
                value={todoListId}
                onChange={(e) => {setTodoListId(e.currentTarget.value)}}

            />
            <input
                placeholder={"taskId"}
                value={taskId}
                onChange={(e) => {setTaskId(e.currentTarget.value)}}
            />
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [status, setStatus] = useState<number>(0);
    const [priority, setPriority] = useState<number>(0);
    const [description, setDescription] = useState<string>("");
    const [startDate, setStartDate] = useState<string>("");
    const [deadline, setDeadline] = useState<string>("");
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [todoListId, setTodoListId] = useState<string>("");

    const updateTask = () => {
        tasksAPI.updateTask(taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        }, todoListId)
            .then((res) => {
                setState(res.data);
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input
                placeholder={"taskId"}
                value={taskId}
                onChange={(e) => {setTaskId(e.currentTarget.value)}}
            />
            <input
                placeholder={"todoListId"}
                value={todoListId}
                onChange={(e) => {setTodoListId(e.currentTarget.value)}}
            />
            <input
                placeholder={"title"}
                value={title}
                onChange={(e) => {setTitle(e.currentTarget.value)}}
            />
            <input
                placeholder={"description"}
                value={description}
                onChange={(e) => {setDescription(e.currentTarget.value)}}
            />
            <input
                placeholder={"status"}
                value={status}
                onChange={(e) => {setStatus(+e.currentTarget.value)}}
            />
            <input
                placeholder={"priority"}
                value={priority}
                onChange={(e) => {setPriority(+e.currentTarget.value)}}
            />
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}