import React from 'react';
import './App.css';
import {
    AppBar, Button, Container,
    IconButton, LinearProgress, Toolbar, Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import TodolistsList from "../features/TodoLists/TodolistsList";
import ErrorSnackbar from "../components/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootState} from "./store";
import {RequestStatusType} from "./app-reducer";

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const status = useSelector<AppRootState, RequestStatusType>((state => state.app.status))
    return (
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
                    <Button color={'inherit'}>
                        Login
                    </Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress color={"secondary"}/>}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}

export default App;
