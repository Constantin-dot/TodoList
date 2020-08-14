import React from "react";
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Task Stories',
    component: Task,
    decorators: [ReduxStoreProviderDecorator]
}

export const TaskBaseExample = (props: any) => {
    return (
        <div>
            <Task task={{id: '1', isDone: true, title: "CSS"}} todoListId={"todoListId1"}/>
            <Task task={{id: '2', isDone: false, title: "JS"}} todoListId={"todoListId2"}/>
        </div>
    )
}