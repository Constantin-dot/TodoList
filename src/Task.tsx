import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const dispatch = useDispatch();
    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskAC(props.task.id, props.todoListId));
    }, [dispatch, props.task.id, props.todoListId])
    const onStatusChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(props.task.id, e.currentTarget.checked, props.todoListId));
    }, [dispatch, props.task.id, props.todoListId])
    const onTitleChangeHandler = useCallback((newTitle: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newTitle, props.todoListId));
    }, [dispatch, props.task.id, props.todoListId])

    return (
        <div key={props.task.id}>
            <Checkbox
                onChange={onStatusChangeHandler}
                checked={props.task.isDone}
            />
            <EditableSpan
                title={props.task.title}
                onChange={onTitleChangeHandler}
            />
            <IconButton onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
});