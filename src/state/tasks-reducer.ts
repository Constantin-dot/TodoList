import {AddTodoListActionType, RemoveTodoListActionType, SetTodoListsActionType} from "./todoLists-reducer";
import {TaskPriorities, tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootState} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskId: string
    todoListId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK'
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    taskId: string
    model: UpdateDomainTaskModelType
    todoListId: string
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskId: string
    title: string
    todoListId: string
}
export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todoListId: string
}

export type ActionType = RemoveTaskActionType | AddTaskActionType |
    UpdateTaskActionType | ChangeTaskTitleActionType |
    AddTodoListActionType | RemoveTodoListActionType |
    SetTodoListsActionType | SetTasksActionType;

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todoListId];
            const filteredTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListId] = filteredTasks;
            return stateCopy;
        }
        case "ADD-TASK": {
            const stateCopy = {...state};
            const newTask = action.task;
            const tasks = stateCopy[newTask.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[newTask.todoListId] = newTasks;
            return stateCopy;
        }
        case "UPDATE-TASK": {
            let todoListTasks = state[action.todoListId];
            let newTasksArray = todoListTasks
                .map(t => t.id === action.taskId
                    ? {...t, ...action.model}
                    : t);
            state[action.todoListId] = newTasksArray
            return ({...state});
        }
        case "CHANGE-TASK-TITLE": {
            let todoListTasks = state[action.todoListId];
            state[action.todoListId] = todoListTasks
                .map(t => t.id === action.taskId
                    ? {...t, title: action.title}
                    : t);
            return ({...state});
        }
        case "ADD-TODOLIST": {
            const stateCopy = {...state};
            stateCopy[action.todoList.id] = [];
            return stateCopy;
        }
        case "REMOVE-TODOLIST": {
            const stateCopy = {...state};
            delete stateCopy[action.id];
            return stateCopy;
        }
        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todoLists.forEach(tl => {
                stateCopy[tl.id] = [];
            })
            return stateCopy
        }
        case "SET-TASKS": {
            const stateCopy = {...state}
            stateCopy[action.todoListId] = action.tasks
            return stateCopy
        }
        default:
            return state;
    }
};

export const removeTaskAC = (todoListId: string, taskId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', todoListId, taskId};
};

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return { type: "ADD-TASK", task};
};

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todoListId: string): UpdateTaskActionType => {
    return { type: "UPDATE-TASK", taskId, model, todoListId};
};

export const changeTaskTitleAC = (taskId: string, title: string, todoListId: string): ChangeTaskTitleActionType => {
    return { type: "CHANGE-TASK-TITLE", taskId, title, todoListId};
};

export const setTasksAC = (tasks: Array<TaskType>, todoListId: string): SetTasksActionType => {
    return { type: "SET-TASKS", tasks, todoListId}
};

export const fetchTasksTC = (todoListId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todoListId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todoListId))
            })
    }
}

export const removeTaskTC = (todoListId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todoListId, taskId)
            .then(res => {
                dispatch(removeTaskAC(todoListId, taskId))
            })
    }
}

export const addTaskTC = (title: string, todoListId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todoListId, title)
            .then(res => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export type UpdateDomainTaskModelType = {
    description?: string
    title?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todoListId: string) => {
    return (dispatch: Dispatch, getState: () => AppRootState) => {
        const state = getState();
        const task = state.tasks[todoListId].find(t => t.id === taskId);
        if (!task) {
            console.warn("task not found in the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            ...domainModel
        }
        tasksAPI.updateTask(taskId, apiModel, todoListId)
            .then(res => {
                dispatch(updateTaskAC(taskId, domainModel, todoListId))
            })
    }
}