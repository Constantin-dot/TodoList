import React, {useCallback, useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {TodoListDomainType} from "./todoLists-reducer";
import {Todolist} from "./Todolist";
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm";
import {useSelector} from "react-redux";
import { Redirect } from 'react-router-dom';
import {selectIsLoggedIn} from "../auth/selectors";
import {todoListsActions} from "./index";
import {useActions, useAppDispatch} from "../../utils/redux-utils";
import {AppRootState} from "../../utils/types"

type PropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}:PropsType) => {
    const {fetchTodoLists} = useActions(todoListsActions)
    const dispatch = useAppDispatch()

    const isLoggedIn = useSelector(selectIsLoggedIn)
    const todoLists = useSelector<AppRootState, Array<TodoListDomainType>>(
       state => state.todoLists
    )

    const addTodoListCallback = useCallback( async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = todoListsActions.addTodoList(title)
        const resultAction = await dispatch(thunk)

        if (todoListsActions.addTodoList.rejected.match(resultAction)) {
            if (resultAction.payload?.errors?.length) {
                const errorMessage = resultAction.payload?.errors[0]
                helper.setError(errorMessage)
            } else {
                helper.setError('Some error occurred')
            }
        } else {
            helper.setTitle('')
            helper.setError(null)
        }
    }, [])

    useEffect(() => {
        if(demo || !isLoggedIn) {
            return
        }
        fetchTodoLists()
    }, [])

    if (!isLoggedIn) {
        return <Redirect to={"/auth"}/>
    }

    return  <>
        <Grid container style={{padding: "10px"}}>
            <AddItemForm addItem={addTodoListCallback} />
        </Grid>
        <Grid container spacing={3} style={{flexWrap: "nowrap", overflowX: "scroll"}}>
            {
                todoLists.map( tl => {
                    return <Grid item key={tl.id}>
                        <div style={{width: "300px"}}>
                            <Todolist
                                todoList={tl}
                                demo={demo}
                            />
                        </div>
                    </Grid>
                })
            }
        </Grid>
    </>
}