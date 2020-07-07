import React, {ChangeEvent} from 'react';
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
                <Checkbox
                    color={'primary'}
                    onChange={onChangeStatusHandler}
                    checked={t.isDone}
                />
                <EditableSpan
                    title={t.title}
                    onChange={onChangeTitleHandler}
                />
                <IconButton
                    onClick={onClickHandler}
                >
                    <Delete />
                </IconButton>
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
                <IconButton
                    onClick={removeTodoList}
                >
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {jsxTasks}
            </ul>
            <div>
                <Button
                    variant={'outlined'}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllChangeFilter}
                >All</Button>
                <Button color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveChangeFilter} variant={'outlined'}>Active</Button>
                <Button color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedChangeFilter} variant={'outlined'}>Completed</Button>
            </div>
        </div>
    )
}

export default Todolist;