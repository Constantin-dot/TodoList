import React from 'react';
import './App.css';
import Todolist, {FilterValueType, TaskType} from './Todolist';
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./state/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    // let todoListId1 = v1();
    // let todoListId2 = v1();

    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todoLists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch()

    function addTask(title: string, todoListId: string) {
        dispatch(addTaskAC(title,todoListId));
    }

    function removeTask(id: string, todoListId: string) {
        dispatch(removeTaskAC(id, todoListId));
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        dispatch(changeTaskStatusAC(id,isDone,todoListId));
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        dispatch(changeTaskTitleAC(id,newTitle,todoListId));
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        dispatch(ChangeTodolistFilterAC(value, todoListId));
    }

    function removeTodoList(id: string) {
        let action = RemoveTodolistAC(id);
        dispatch(action);
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        dispatch(ChangeTodolistTitleAC(id, newTitle));
    }

    function addTodoList(title:string) {
        let action = AddTodolistAC(title);
        dispatch(action);
    }

    return (
        <div className="App">
            <AppBar position={'static'} >
                <Toolbar>
                    <IconButton
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodoList}  />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {

                            let taskForTodoList = tasks[tl.id];
                            if(tl.filter === "active") {
                                taskForTodoList = taskForTodoList.filter(t => t.isDone === false)
                            }
                            if(tl.filter === "completed") {
                                taskForTodoList = taskForTodoList.filter(t => t.isDone === true)
                            }
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            tasks={taskForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeTaskStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            changeTodoListTitle={changeTodoListTitle}
                                            filter={tl.filter}
                                            removeTodoList={removeTodoList}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
