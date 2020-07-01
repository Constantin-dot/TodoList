import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValueType = "all" | "active" | "completed";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todoListId: string) => void
    changeFilter: (value: FilterValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
}

export function Todolist(props: PropsType) {

    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    let jsxTasks = props.tasks.map((t) => {
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
        }

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => {props.removeTask(t.id, props.id)}}> x </button>
            </li>
        )
    });

    const onAddTaskClick = () => {
        if (title.trim() !== ""){
            props.addTask(title, props.id);
        } else {
            setError("Title is required");
        }
        setTitle("");
    }
    const onAddTaskPress = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if(e.charCode === 13) {
            onAddTaskClick()
        }
    }
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value);
    const onAllChangeFilter = () => props.changeFilter("all", props.id);
    const onActiveChangeFilter = () => props.changeFilter("active", props.id);
    const onCompletedChangeFilter = () => props.changeFilter("completed", props.id);

    return (
        <div>
            <h3>{props.title}<button onClick={() => {props.removeTodoList(props.id)}}>X</button></h3>
            <div>
                <input
                    type={'text'}
                    value={title}
                    onChange={onTitleChange}
                    onKeyPress={onAddTaskPress}
                />
                <button onClick={onAddTaskClick}>Add</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <button className={props.filter === "all" ? "active-filter" : ""}
                    onClick={onAllChangeFilter}>All</button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                    onClick={onActiveChangeFilter}>Active</button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                    onClick={onCompletedChangeFilter}>Completed</button>
            </div>
        </div>
    )
}

export default Todolist;