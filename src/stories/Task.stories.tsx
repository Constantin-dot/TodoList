import React from "react";
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";

export default  {
    title: 'Task Component',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

// const changeTaskStatusCallback = action('Status changed');
// const changeTaskTitleCallback = action('Title changed');
// const removeTaskCallback = action('Task changed');

export const TaskBaseExample = () => {
    return <>
        <Task
            task={ {id: '1', title: 'CSS',  description: "", status: TaskStatuses.New, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 0, todoListId: "todoListId1", addedDate: ""}}
            todoListId={"todoListId1"}
        />
        <Task
            task={ {id: '2', title: 'JS', description: "", status: TaskStatuses.Completed, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 1, todoListId: "todoListId2", addedDate: ""}}
            todoListId={"todoListId2"}
        />
        </>
}