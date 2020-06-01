import React from 'react';

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed";

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export function Todolist(props: PropsType) {
    let jsxTasks = props.tasks.map((t) => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {props.removeTask(t.id)}}> x </button>
            </li>
        )
    });

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type={'text'}/>
                <button>+</button>
            </div>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button onClick={() => {props.changeFilter("all")}}>All</button>
                <button onClick={() => {props.changeFilter("active")}}>Active</button>
                <button onClick={() => {props.changeFilter("completed")}}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;