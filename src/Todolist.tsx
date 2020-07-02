import React, {ChangeEvent} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";

export type TaskType = {
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
    changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void
    filter: FilterValueType
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {

    let jsxTasks = props.tasks.map((t) => {
        const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let newIsDoneValue = e.currentTarget.checked;
            props.changeTaskStatus(t.id, newIsDoneValue, props.id);
        }
        const onChangeTitleHandler = (newValue: string) => {
            props.changeTaskTitle(t.id, newValue, props.id);
        }
        const onClickHandler = () => props.removeTask(t.id, props.id)

        return (
            <li key={t.id} className={t.isDone ? "is-done" : ""}>
                <input
                    type="checkbox"
                    onChange={onChangeStatusHandler}
                    checked={t.isDone}
                />
                <EditableSpan
                    title={t.title}
                    onChange={onChangeTitleHandler}
                />
                <button onClick={onClickHandler}> x </button>
            </li>
        )
    });

    const addTask = (title: string) => {
        props.addTask(title, props.id);
    }
    const onAllChangeFilter = () => props.changeFilter("all", props.id);
    const onActiveChangeFilter = () => props.changeFilter("active", props.id);
    const onCompletedChangeFilter = () => props.changeFilter("completed", props.id);
    const removeTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = (newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <button onClick={removeTodoList}>X</button>
            </h3>
            <AddItemForm addItem={addTask} />
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