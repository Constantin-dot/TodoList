import {addTodoListAC, TodoListDomainType, todoListsReducer} from "./todoLists-reducer";
import {tasksReducer, TasksStateType} from "../Tasks/tasks-reducer";

test('ids should be equals', () => {
    const  startTasksState: TasksStateType = {};
    const  startTodoListsState: Array<TodoListDomainType> = [];

    let todoList = {
        id: "1.2",
        title: "new todoList",
        order: 0,
        addedDate: ""
    };

    const action = addTodoListAC(todoList);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodoLists).toBe(action.todoList.id);
});