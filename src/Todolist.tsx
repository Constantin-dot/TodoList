import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskTC, fetchTasksTC} from "./state/tasks-reducer";
import {Task} from "./Task";
import {FilterValuesType} from "./state/todoLists-reducer";
import {TaskStatuses, TaskType} from "./api/tasks-api";

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, title: string) => void
}



export const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasksTC(props.id));
    }, [dispatch, props])

    const tasks = useSelector<AppRootState, Array<TaskType>>(
        state => state.tasks[props.id]
    );

    const addTask = useCallback( (title: string) => {
        dispatch(addTaskTC(title, props.id));
    }, [dispatch, props])

    const onAllClickHandler = useCallback(
        () => props.changeFilter("all", props.id), [props]
    )
    const onActiveClickHandler = useCallback(
        () => props.changeFilter("active", props.id), [props]
    )
    const onCompletedClickHandler = useCallback(
        () => props.changeFilter("completed", props.id), [props]
    )
    const deleteTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.id, title);
    }, [props]);

    let allTodoListTasks = tasks;
    let tasksForTodoList = allTodoListTasks;

    if (props.filter === "completed") {
        tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.filter === "active") {
        tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.New);
    }

            return (
                <div>
                    <h3>
                        <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                        <IconButton onClick={deleteTodoList}>
                            <Delete />
                        </IconButton>
                    </h3>
                    <AddItemForm addItem={addTask}/>
                    <div>
                        {
                            tasksForTodoList.map((t) =>
                                <Task
                                    task={t}
                                    todoListId={props.id}
                                    key={t.id}
                                />)
                        }
                    </div>
                    <div>
                        <Button
                            variant={props.filter === "all" ? "contained" : "text"}
                            onClick={onAllClickHandler}
                        >
                            All
                        </Button>
                        <Button
                            color={'primary'}
                            onClick={onActiveClickHandler}
                            variant={props.filter === "active" ? "contained" : "text"}
                        >
                            Active
                        </Button>
                        <Button
                            color={'secondary'}
                            onClick={onCompletedClickHandler}
                            variant={props.filter === "completed" ? "contained" : "text"}
                        >
                            Completed
                        </Button>
                    </div>
                </div>
            )
    });

