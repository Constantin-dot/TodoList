import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../components/AddItemForm";
import {EditableSpan} from "../../components/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import {addTaskTC, fetchTasksTC} from "../Tasks/tasks-reducer";
import {Task} from "../Tasks/Task";
import {FilterValuesType, TodoListDomainType} from "./todoLists-reducer";
import {TaskStatuses, TaskType} from "../../api/tasks-api";

type PropsType = {
    todoList: TodoListDomainType
    // id: string
    // title: string
    // filter: FilterValuesType
    changeFilter: (value: FilterValuesType, todoListId: string) => void
    removeTodoList: (id: string) => void
    changeTodoListTitle: (id: string, title: string) => void
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {

    const dispatch = useDispatch();

    useEffect(() => {
        if(demo) {
            return
        }
        dispatch(fetchTasksTC(props.todoList.id));
    }, [])

    const tasks = useSelector<AppRootState, Array<TaskType>>(
        state => state.tasks[props.todoList.id]
    );

    const addTask = useCallback( (title: string) => {
        dispatch(addTaskTC(title, props.todoList.id));
    }, [dispatch, props])

    const onAllClickHandler = useCallback(
        () => props.changeFilter("all", props.todoList.id), [props]
    )
    const onActiveClickHandler = useCallback(
        () => props.changeFilter("active", props.todoList.id), [props]
    )
    const onCompletedClickHandler = useCallback(
        () => props.changeFilter("completed", props.todoList.id), [props]
    )
    const deleteTodoList = () => props.removeTodoList(props.todoList.id);
    const changeTodoListTitle = useCallback((title: string) => {
        props.changeTodoListTitle(props.todoList.id, title);
    }, [props]);

    let allTodoListTasks = tasks;
    let tasksForTodoList = allTodoListTasks;

    if (props.todoList.filter === "completed") {
        tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed);
    }
    if (props.todoList.filter === "active") {
        tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.New);
    }

            return (
                <div>
                    <h3>
                        <EditableSpan title={props.todoList.title} onChange={changeTodoListTitle} />
                        <IconButton
                            onClick={deleteTodoList}
                            disabled={props.todoList.entityStatus === 'loading'}
                        >
                            <Delete />
                        </IconButton>
                    </h3>
                    <AddItemForm
                        addItem={addTask}
                        disabled={props.todoList.entityStatus === 'loading'}
                    />
                    <div>
                        {
                            tasksForTodoList.map((t) =>
                                <Task
                                    task={t}
                                    todoListId={props.todoList.id}
                                    key={t.id}
                                />)
                        }
                    </div>
                    <div>
                        <Button
                            variant={props.todoList.filter === "all" ? "contained" : "text"}
                            onClick={onAllClickHandler}
                        >
                            All
                        </Button>
                        <Button
                            color={'primary'}
                            onClick={onActiveClickHandler}
                            variant={props.todoList.filter === "active" ? "contained" : "text"}
                        >
                            Active
                        </Button>
                        <Button
                            color={'secondary'}
                            onClick={onCompletedClickHandler}
                            variant={props.todoList.filter === "completed" ? "contained" : "text"}
                        >
                            Completed
                        </Button>
                    </div>
                </div>
            )
    });

