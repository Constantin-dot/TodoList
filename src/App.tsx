import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListTC, changeTodoListFilterAC, changeTodoListTitleTC,
    fetchTodoListsTC, FilterValuesType,
    removeTodoListTC, TodoListDomainType
} from "./state/todoLists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";

function App() {
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(
        state => state.todoLists
    );

    useEffect(() => {
        dispatch(fetchTodoListsTC());
    }, [dispatch]);

    const changeTodoListTitle = useCallback((id: string, title: string) => {
        const thunk = changeTodoListTitleTC(id, title)
        dispatch(thunk)
    }, [dispatch]);

    const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC(value, todoListId));
    }, [dispatch]);

    const removeTodoList = useCallback ((id: string) => {
        const thunk = removeTodoListTC(id)
        dispatch(thunk);
    }, [dispatch]);

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodoListTC(title);
        dispatch(thunk);
    }, [dispatch]);



    return (
        <div className="App">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "10px"}}>
                    <AddItemForm addItem={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todoLists.map( tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        title={tl.title}
                                        id={tl.id}
                                        changeFilter={changeFilter}
                                        filter={tl.filter}
                                        removeTodoList={removeTodoList}
                                        changeTodoListTitle={changeTodoListTitle}
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

export default App;
