import React, {useCallback, useEffect} from "react"
import {AddItemForm, AddItemFormSubmitHelperType} from "../../components/AddItemForm"
import {EditableSpan} from "../../components/EditableSpan"
import {Button, IconButton, Paper, PropTypes} from "@material-ui/core"
import {Delete} from "@material-ui/icons"
import {useSelector} from "react-redux"
import {Task} from "../tasks/Task"
import {FilterValuesType, TodoListDomainType} from "./todoLists-reducer"
import {TaskStatuses, TaskType} from "../../api/types"
import {tasksActions, todoListsActions} from "./index"
import {useActions, useAppDispatch} from "../../utils/redux-utils"
import {AppRootState} from "../../utils/types";

type PropsType = {
    todoList: TodoListDomainType
    demo?: boolean
}

export const Todolist = React.memo(({demo = false, ...props}: PropsType) => {
    const {changeTodoListFilter, removeTodoList, changeTodoListTitle} = useActions(todoListsActions)
    const {fetchTasks} = useActions(tasksActions)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if(demo) {
            return
        }
        fetchTasks(props.todoList.id)
    }, [])

    const tasks = useSelector<AppRootState, Array<TaskType>>(
        state => state.tasks[props.todoList.id]
    )

    const addTaskCallback = useCallback(async (title: string, helper: AddItemFormSubmitHelperType) => {
        let thunk = tasksActions.addTask({title, todoListId: props.todoList.id})
        const resultAction = await dispatch(thunk)
        if (tasksActions.addTask.rejected.match(resultAction)) {
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
    }, [props.todoList.id])

    const onFilterButtonClickHandler = useCallback(
        (filter: FilterValuesType) => changeTodoListFilter({
            filter: filter,
            id: props.todoList.id}), [props.todoList.id]
    )
    const deleteTodoList = () => removeTodoList(props.todoList.id)

    const changeTitleHandler = useCallback((title: string) => {
        changeTodoListTitle({id: props.todoList.id, title})
    }, [props])
    let allTodoListTasks = tasks
    let tasksForTodoList = allTodoListTasks

    if (props.todoList.filter === "completed") {
        tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.todoList.filter === "active") {
        tasksForTodoList = allTodoListTasks.filter(t => t.status === TaskStatuses.New)
    }

    const renderFilterButton = (
        color: PropTypes.Color,
        buttonFilter: FilterValuesType,
        label: string
    ) => {
        return <Button
            color={color}
            onClick={() => onFilterButtonClickHandler(buttonFilter)}
            variant={props.todoList.filter === buttonFilter ? "contained" : "text"}
        >
            {label}
        </Button>
    }
            return (
                <Paper style={{padding: '10px', position: 'relative'}}>
                    <IconButton
                        size={'small'}
                        onClick={deleteTodoList}
                        disabled={props.todoList.entityStatus === 'loading'}
                        style={{position: 'absolute', right: '5px', top: '5px'}}
                    >
                        <Delete fontSize={'small'}/>
                    </IconButton>
                    <h3>
                        <EditableSpan title={props.todoList.title} onChange={changeTitleHandler} />
                    </h3>
                    <AddItemForm
                        addItem={addTaskCallback}
                        disabled={props.todoList.entityStatus === 'loading'}
                    />
                    <div>
                        {
                            tasksForTodoList.map((t) =>
                                <Task
                                    task={t}
                                    todoListId={props.todoList.id}
                                    key={t.id}
                                />)
                        }
                        { !tasksForTodoList.length && <div style={{padding: '10px', color: 'gray'}}>No tasks</div>}
                    </div>
                    <div>
                        {renderFilterButton('default', 'all', 'All')}
                        {renderFilterButton('primary', 'active', 'Active')}
                        {renderFilterButton('secondary', 'completed', 'Completed')}

                    </div>
                </Paper>
            )
    })