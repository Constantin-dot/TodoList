import {useDispatch} from "react-redux";
import {
    removeTaskTC, updateTaskTC
} from "./tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../../components/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/tasks-api";

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch();

    const onRemoveHandler = useCallback(() => {
        dispatch(removeTaskTC({todoListId: props.todoListId, taskId: props.task.id}))
    }, [])

    const onStatusChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
        const thunk = updateTaskTC(props.task.id,
            {status},
            props.todoListId)
        dispatch(thunk);
    }, [])

    const onTitleChangeHandler = useCallback((newTitle: string) => {
        dispatch(updateTaskTC(props.task.id, {title: newTitle}, props.todoListId));
    }, [])

    return (
        <div key={props.task.id}>
            <Checkbox
                onChange={onStatusChangeHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan
                title={props.task.title}
                onChange={onTitleChangeHandler}
            />
            <IconButton onClick={onRemoveHandler}>
                <Delete />
            </IconButton>
        </div>
    )
});