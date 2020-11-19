import React, {useCallback, useEffect} from 'react';
import {Grid, Paper} from "@material-ui/core";
import {
    addTodoListTC,
    changeTodoListFilterAC,
    changeTodoListTitleTC,
    fetchTodoListsTC,
    FilterValuesType, removeTodoListTC,
    TodoListDomainType
} from "./todoLists-reducer";
import {Todolist} from "./Todolist";
import {AddItemForm} from "../../components/AddItemForm";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "../../app/store";
import { Redirect } from 'react-router-dom';

type PropsType = {
    demo?: boolean
}

const TodolistsList = ({demo = false}:PropsType) => {
    const isLoggedIn = useSelector<AppRootState, boolean>(state => state.auth.isLoggedIn)
    const dispatch = useDispatch();
    const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(
        state => state.todoLists
    );

    useEffect(() => {
        if(demo || !isLoggedIn) {
            return
        }
        dispatch(fetchTodoListsTC());
    }, []);

    const changeTodoListTitle = useCallback((id: string, title: string) => {
        const thunk = changeTodoListTitleTC({id, title})
        dispatch(thunk)
    }, []);

    const changeFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(changeTodoListFilterAC({filter, id: todoListId}));
    }, []);

    const removeTodoList = useCallback ((id: string) => {
        const thunk = removeTodoListTC(id)
        dispatch(thunk);
    }, []);

    const addTodoList = useCallback((title: string) => {
        const thunk = addTodoListTC(title);
        dispatch(thunk);
    }, []);

    if (!isLoggedIn) {
        return <Redirect to={"/login"}/>
    }

    return  <>
        <Grid container style={{padding: "10px"}}>
            <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
            {
                todoLists.map( tl => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                // filter={tl.filter}
                                // title={tl.title}
                                // id={tl.id}
                                changeFilter={changeFilter}
                                todoList={tl}
                                removeTodoList={removeTodoList}
                                changeTodoListTitle={changeTodoListTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}

export default TodolistsList;