import React, {useState} from 'react';
import './App.css';
import Todolist, {FilterValueType} from './Todolist';



function App() {
    let [tasks, setTasks] = useState([
        { id: 1, title: "HTML&CSS", isDone: true },
        { id: 2, title: "JS", isDone: true },
        { id: 3, title: "ReactJS", isDone: false },
        { id: 4, title: "GraphQL", isDone: false },
        { id: 5, title: "RestAPI", isDone: false }
    ]);

    let [filter, setFilter] = useState<FilterValueType>("all")

    function changeFilter(value: FilterValueType) {
        setFilter(value);
    }

    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id);
        setTasks(filteredTasks);
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
            />
        </div>
    );
}

export default App;
