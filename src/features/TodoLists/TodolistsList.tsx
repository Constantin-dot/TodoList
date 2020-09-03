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

const TodolistsList = () => {
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
    </>
}

export default TodolistsList;