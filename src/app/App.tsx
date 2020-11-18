import React, {useCallback, useEffect} from 'react';
import classes from './App.module.css';
import {
    AppBar, Button, CircularProgress, Container,
    IconButton, LinearProgress, Toolbar
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import TodolistsList from "../features/TodoLists/TodolistsList";
import ErrorSnackbar from "../components/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {initializeAppTC} from "./app-reducer";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "../features/login/Login";
import {logoutTC} from "../features/login/auth-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootState>((state => state.app.status))
    const isInitialized = useSelector<AppRootState, boolean>((state => state.app.isInitialized))
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootState, boolean>((state => state.auth.isLoggedIn))

    useEffect(() => {
        if (!demo) {
            dispatch(initializeAppTC())
        }
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position={'static'}>
                <Toolbar className={classes.header}>
                    <IconButton
                        edge={'start'}
                        color={'inherit'}
                        aria-label={'menu'}
                    >
                        <Menu/>
                    </IconButton>
                    {isLoggedIn && <Button color={'inherit'}
                                           onClick={logoutHandler}>
                        Log out
                    </Button>}
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <Route
                    exact path={"/"} render={() => <TodolistsList demo={demo}/>}
                />
                <Route
                    path={"/login"} render={() => <Login/>}
                />
            </Container>
        </div>
    );
}

export default App;
