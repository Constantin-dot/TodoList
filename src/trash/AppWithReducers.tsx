import React, {useReducer} from 'react';
import '../app/App.css';
import {Todolist} from "../features/TodoLists/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "../components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "../features/TodoLists/todoLists-reducer";
import {tasksReducer} from "../features/Tasks/tasks-reducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
export type FilterValuesType = "all" | "completed" | "active";


function AppWithReducers() {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, dispatchToTodoListsReducer] =useReducer(todoListsReducer, [
        {id: todoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ]);

    let [tasks, dispatchToTasksReducer] = useReducer(tasksReducer,{
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed,
                todoListId: todoListId1, startDate: "", deadline: "",
            order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "JS", status: TaskStatuses.Completed,
                todoListId: todoListId1, startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "ReactJS", status: TaskStatuses.Completed,
                todoListId: todoListId1, startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "Redux", status: TaskStatuses.Completed,
                todoListId: todoListId1, startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
        ],
        [todoListId2]: [
            {id: v1(), title: "Book", status: TaskStatuses.Completed,
                todoListId: todoListId2, startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,
                todoListId: todoListId2, startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
            {id: v1(), title: "apples", status: TaskStatuses.Completed,
                todoListId: todoListId2, startDate: "", deadline: "",
                order: 0, priority: TaskPriorities.Low, description: "", addedDate: ""},
        ]
    });

    function changeTodoListTitle(id: string, title: string) {
        dispatchToTodoListsReducer(changeTodoListTitleAC(id, title));
    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        dispatchToTodoListsReducer(changeTodoListFilterAC(value, todoListId));
    }

    function removeTodoList(id: string) {
        dispatchToTodoListsReducer(removeTodoListAC(id));
        dispatchToTasksReducer(removeTodoListAC(id));
    }

    function addTodoList(title: string) {
        const action = addTodoListAC({
            id: v1(),
            addedDate: "",
            order: 0,
            title: "New TodoList",
        })
        dispatchToTodoListsReducer(action);
        dispatchToTasksReducer(action);
    }



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
                    {todoLists.map( (tl) => {
                        return <Grid item>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                    title={tl.title}
                                    key={tl.id}
                                    id={tl.id}
                                    changeFilter={changeFilter}
                                    filter={tl.filter}
                                    removeTodoList={removeTodoList}
                                    changeTodoListTitle={changeTodoListTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
