import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValueType} from './Todolist';
import {v1} from "uuid";

type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App() {
    // let [tasks, setTasks] = useState([
    //     { id: v1(), title: "HTML&CSS", isDone: true },
    //     { id: v1(), title: "JS", isDone: true },
    //     { id: v1(), title: "ReactJS", isDone: false },
    //     { id: v1(), title: "GraphQL", isDone: false },
    //     { id: v1(), title: "RestAPI", isDone: false }
    // ]);
    let todoListId1 = v1();
    let todoListId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {
            id: todoListId1,
            title: "What to learn",
            filter: "all",
        },
        {
            id: todoListId2,
            title: "What to buy",
            filter: "all",
        }
    ]);

    let [tasks, setTasks] = useState({
        [todoListId1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
            { id: v1(), title: "RestAPI", isDone: false },
        ],
        [todoListId2]: [
            { id: v1(), title: "Milk", isDone: true },
            { id: v1(), title: "Book", isDone: true },
            { id: v1(), title: "Apples", isDone: false },
        ]
    })

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todoListTasks =  tasks[todoListId];
        tasks[todoListId] = [task, ...todoListTasks];
        setTasks({...tasks});
    }

    function removeTask(id: string, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        tasks[todoListId] = todoListTasks.filter(t => t.id !== id);
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todoListId: string) {
        let todoListTasks = tasks[todoListId];
        let task = todoListTasks.find(t => t.id === id);
        if(task) {
            task.isDone = isDone;
            setTasks({...tasks});
        }
    }

    function changeFilter(value: FilterValueType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function removeTodoList(id: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== id));
        delete tasks[id];
        setTasks({...tasks});
    }

    return (
        <div className="App">
            {
                todoLists.map(tl => {
                    let allTodoListTasks = tasks[tl.id];
                    let taskForTodoList = allTodoListTasks;
                    if(tl.filter === "active") {
                        taskForTodoList = allTodoListTasks.filter(t => t.isDone === false)
                    }
                    if(tl.filter === "completed") {
                        taskForTodoList = allTodoListTasks.filter(t => t.isDone === true)
                    }
                    return <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={"What to learn"}
                        tasks={taskForTodoList}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                })
            }
        </div>
    );
}

export default App;
