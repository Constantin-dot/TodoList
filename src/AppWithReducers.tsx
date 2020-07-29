import React, {useReducer} from 'react';
import './App.css';
import Todolist, {FilterValueType, TaskType} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todoListsReducer
} from "./state/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();


    let [todoLists, dispatchToTodoLists] = useReducer(todoListsReducer, [
        {
            id: todoListId1,
            title: "What to learn",
            filter: "all",
        },
        {
            id: todoListId2,
            title: "What to buy",
            filter: "all",
        }
    ]);

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
            { id: v1(), title: "RestAPI", isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Book", isDone: true },
            { id: v1(), title: "Apples", isDone: false },
        ]
    })

    function addTask(title: string, todoListId: string) {
        dispatchToTasks(addTaskAC(title,todoListId));
    }

    function removeTask(id: string, todoListId: string) {
        dispatchToTasks(removeTaskAC(id, todoListId));
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        dispatchToTasks(changeTaskStatusAC(id,isDone,todoListId));
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        dispatchToTasks(changeTaskTitleAC(id,newTitle,todoListId));
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        dispatchToTodoLists(ChangeTodolistFilterAC(value, todoListId));
    }

    function removeTodoList(id: string) {
        let action = RemoveTodolistAC(id);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        dispatchToTodoLists(ChangeTodolistTitleAC(id, newTitle));
    }

    function addTodoList(title:string) {
        let action = AddTodolistAC(title);
        dispatchToTodoLists(action);
        dispatchToTasks(action);
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

export default AppWithReducers;
