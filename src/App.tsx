import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValueType} from './Todolist';
import {v1} from "uuid";



function App() {
    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
        { id: v1(), title: "RestAPI", isDone: false }
    ]);

    let [filter, setFilter] = useState<FilterValueType>("all")

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks([newTask, ...tasks]);
    }

    function changeStatus(id: string, isDone: boolean) {
        let task = tasks.find(t => t.id === id);
        if(task) {
            task.isDone = isDone;
            setTasks([...tasks]);
        }
    }

    let taskForTodoList = tasks;
    if(filter === "active") {
        taskForTodoList = tasks.filter(t => t.isDone === false)
    }
    if(filter === "completed") {
        taskForTodoList = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title={"What to learn"}
                      tasks={taskForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus}
                      filter={filter}
            />
        </div>
    );
}

export default App;
