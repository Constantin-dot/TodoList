import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

function App() {

    let task1: Array<TaskType> = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]


    let task2: Array<TaskType> = [
        {id: 1, title: "Crazy", isDone: true},
        {id: 2, title: "I'm happy", isDone: false},
        {id: 3, title: "Yo", isDone: false}
    ]

    return (
        <div className="App">
            <Todolist title={"What to learn"} tasks={task1} />
            <Todolist title={"Songs"} tasks={task2}/>
        </div>
    );
}

export default App;
