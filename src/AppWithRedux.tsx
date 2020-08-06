import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC, FilterValuesType,
    RemoveTodolistAC, TodoListType,
} from "./state/todoLists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

function AppWithRedux() {
    console.log('AppWithRedux is called');
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootStateType, Array<TodoListType>>(
        state => state.todoLists
    );

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodolistFilterAC(value, todoListId));
    }, [dispatch]);

    const removeTodoList = useCallback((id: string) => {
        dispatch(RemoveTodolistAC(id));
    }, [dispatch]);

    const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(id, newTitle));
    }, [dispatch]);

    const addTodoList = useCallback((title:string) => {
        dispatch(AddTodolistAC(title));
    }, [dispatch]);

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
                <Grid container style={{padding: '10px'}}>
                    <AddItemForm addItem={addTodoList}  />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
                                            id={tl.id}
                                            title={tl.title}
                                            filter={tl.filter}
                                            changeFilter={changeFilter}
                                            changeTodoListTitle={changeTodoListTitle}
                                            removeTodoList={removeTodoList}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
