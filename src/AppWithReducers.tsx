import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC,
    todoListsReducer
} from "./state/todoLists-reducer";
import {tasksReducer} from "./state/tasks-reducer";


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


    function changeFilter(value: FilterValuesType, todoListId: string) {
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
                            return (
                                <Grid item key={tl.id}>
                                    <Paper style={{padding: '10px'}}>
                                        <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            changeFilter={changeFilter}
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
