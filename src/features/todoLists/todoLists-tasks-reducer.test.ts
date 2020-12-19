import {slice as todoListsSlice, TodoListDomainType} from "./todoLists-reducer"
import {slice as tasksSlice, TasksStateType} from "../tasks/tasks-reducer"
import {todoListsActions} from "./index"

const {reducer: tasksReducer} = tasksSlice
const {reducer: todoListsReducer} = todoListsSlice
const {addTodoList} = todoListsActions

test('ids should be equals', () => {
    const  startTasksState: TasksStateType = {};
    const  startTodoListsState: Array<TodoListDomainType> = [];

    let todoList = {
        id: "1.2",
        title: "new todoList",
        order: 0,
        addedDate: ""
    };

    const action = addTodoList.fulfilled({todoList: todoList}, "requestId", todoList.title);

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodoListsState = todoListsReducer(startTodoListsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.payload.todoList.id);
    expect(idFromTodoLists).toBe(action.payload.todoList.id);
});