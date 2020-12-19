import React, {ChangeEvent, useCallback} from "react"
import {Checkbox, IconButton} from "@material-ui/core"
import {EditableSpan} from "../../components/EditableSpan"
import {Delete} from "@material-ui/icons"
import {TaskStatuses, TaskType} from "../../api/types"
import {tasksActions} from "./index"
import {useActions} from "../../utils/redux-utils"

type TaskPropsType = {
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {

    const {removeTask, updateTask} = useActions(tasksActions)

    const onRemoveHandler = useCallback(() => {
        removeTask({todoListId: props.todoListId, taskId: props.task.id})
    }, [props.task.id, props.todoListId])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        updateTask({
            taskId: props.task.id,
            model: {status: e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New},
            todoListId: props.todoListId
        })
    }, [props.task.id, props.todoListId])

    const onTitleChangeHandler = useCallback((newTitle: string) => {
        updateTask({taskId: props.task.id, model: {title: newTitle}, todoListId: props.todoListId})
    }, [props.task.id, props.todoListId])

    return (
        <div
            key={props.task.id}
            style={{position: 'relative'}}
        >
            <Checkbox
                onChange={onChangeHandler}
                checked={props.task.status === TaskStatuses.Completed}
            />
            <EditableSpan
                title={props.task.title}
                onChange={onTitleChangeHandler}
            />
            <IconButton
                onClick={onRemoveHandler}
                style={{position: 'absolute', top: '-2px', right: '2px'}}
            >
                <Delete fontSize={'small'}/>
            </IconButton>
        </div>
    )
})