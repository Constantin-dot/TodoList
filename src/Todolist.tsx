import React, {useCallback} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {FilterValuesType} from "./state/todoLists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, TaskType} from "./state/tasks-reducer";
import {AppRootStateType} from "./state/store";
import {Task} from "./Task";

type PropsType = {
    id: string
    title: string
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    filter: FilterValuesType
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, newTitle: string) => void
}

export const Todolist = React.memo((props: PropsType) => {
    console.log("TodoList is called");
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootStateType, Array<TaskType>>(
        state => state.tasks[props.id]
    );

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, props.id));
    }, [dispatch, props.id]);
    const onAllChangeFilter = useCallback(
        () => props.changeFilter("all", props.id), [props]
    );
    const onActiveChangeFilter = useCallback(
        () => props.changeFilter("active", props.id), [props]
    );
    const onCompletedChangeFilter = useCallback(
        () => props.changeFilter("completed", props.id), [props]
    );
    const removeTodoList = () => props.removeTodoList(props.id);
    const changeTodoListTitle = useCallback((newTitle: string) => {
        props.changeTodoListTitle(props.id, newTitle);
    }, [props]);

    let allTodoListTasks = tasks;
    let tasksForTodoList = allTodoListTasks;

    if(props.filter === "active") {
        tasksForTodoList = allTodoListTasks.filter(t => !t.isDone);
    }
    if(props.filter === "completed") {
        tasksForTodoList = allTodoListTasks.filter(t => t.isDone);
    }
    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodoListTitle} />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {
                    tasksForTodoList.map((t) =>
                        <Task
                            task={t}
                            todoListId={props.id}
                            key={t.id}
                        />
                    )
                }
            </div>
            <div>
                <Button
                    variant={'outlined'}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    onClick={onAllChangeFilter}
                >
                    All
                </Button>
                <Button
                    color={props.filter === "active" ? "secondary" : "primary"}
                    onClick={onActiveChangeFilter}
                    variant={'outlined'}
                >
                    Active
                </Button>
                <Button
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    onClick={onCompletedChangeFilter}
                    variant={'outlined'}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
});
