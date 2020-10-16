import React, {useCallback, useEffect} from 'react';
import './App.css';
import {
    AppBar, Button, CircularProgress, Container,
    IconButton, LinearProgress, Toolbar, Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import TodolistsList from "../features/TodoLists/TodolistsList";
import ErrorSnackbar from "../components/ErrorSnackbar";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store";
import {initializeAppTC, RequestStatusType} from "./app-reducer";
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
        dispatch(initializeAppTC())
    }, [])

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    if (!isInitialized) {
        return <div  style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress />
        </div>
    }

    return (
        <BrowserRouter>
            <div className="App">
                <ErrorSnackbar />
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
        </BrowserRouter>
    );
}

export default App;
