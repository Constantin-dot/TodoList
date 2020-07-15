import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValueType, TaskType} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
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

    let [tasks, setTasks] = useState<TasksStateType>({
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
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks =  tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === id);
        if(task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === id);
        if(task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    function changeTodoListTitle(id: string, newTitle: string) {
        const todoList = todoLists.find(tl => tl.id === id);
        if(todoList) {
            todoList.title = newTitle;
            setTodoLists([...todoLists]);
        }
    }

    function addTodoList(title:string) {
        let todolist: TodoListType = {
            id: v1(),
            filter: 'all',
            title: title,
        }
        setTodoLists([todolist, ...todoLists]);
        setTasks({
            ...tasks,
            [todolist.id]: []
        })
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

export default App;
