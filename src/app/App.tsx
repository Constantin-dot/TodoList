import React, {useCallback, useEffect} from 'react'
import classes from './App.module.css'
import {
    AppBar, Button, CircularProgress, Container,
    IconButton, LinearProgress, Toolbar
} from "@material-ui/core"
import {Menu} from "@material-ui/icons"
import ErrorSnackbar from "../components/ErrorSnackbar"
import {useSelector} from "react-redux"
import {applicationActions} from "../features/application"
import {Route} from "react-router-dom"
import {authActions, Login} from "../features/auth"
import {selectIsInitialized, selectStatus} from "../features/application/selectors"
import {authSelectors} from "../features/auth"
import {TodolistsList} from "../features/todoLists"
import {useActions} from "../utils/redux-utils"

type PropsType = {}

function App() {
    const {logout} = useActions(authActions)
    const {initializeApp} = useActions(applicationActions)
    const status = useSelector(selectStatus)
    const isInitialized = useSelector(selectIsInitialized)
    const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)

    useEffect(() => {
        if (!isInitialized) {
            initializeApp()
        }
    }, [])

    const logoutHandler = useCallback(() => {
        logout()
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
                    exact path={"/"} render={() => <TodolistsList demo={false}/>}
                />
                <Route
                    path={"/auth"} render={() => <Login/>}
                />
            </Container>
        </div>
    )
}

export default App
