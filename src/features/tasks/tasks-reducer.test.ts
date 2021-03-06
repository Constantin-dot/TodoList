import {slice, asyncActions, TasksStateType} from "./tasks-reducer"
import {todoListsActions} from "../todoLists"
import {TaskPriorities, TaskStatuses} from "../../api/types"

const {reducer: tasksReducer} = slice
const {removeTask, addTask, fetchTasks, updateTask} = asyncActions
const {addTodoList, removeTodoList, fetchTodoLists} = todoListsActions

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todoListId1": [
            {id: "1", title: "HTML&CSS",description: "", status: TaskStatuses.New, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 0, todoListId: "todoListId1", addedDate: ""},
            {id: "2", title: "JS", description: "", status: TaskStatuses.Completed, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 1, todoListId: "todoListId1", addedDate: ""},
            {id: "3", title: "ReactJS", description: "", status: TaskStatuses.New, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 2, todoListId: "todoListId1", addedDate: ""},
        ],
        "todoListId2": [
            {id: "1", title: "Book", description: "", status: TaskStatuses.Completed, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 0, todoListId: "todoListId2", addedDate: ""},
            {id: "2", title: "Milk", description: "", status: TaskStatuses.Completed, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 1, todoListId: "todoListId2", addedDate: ""},
            {id: "3", title: "apples", description: "", status: TaskStatuses.New, priority: TaskPriorities.Hi,
                startDate: "", deadline: "", order: 2, todoListId: "todoListId2", addedDate: ""},
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    let params = {todoListId: "todoListId2", taskId: "2"}
    const action = removeTask.fulfilled(params, "requestId", params);

    const endState = tasksReducer(startState, action);

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(2);
    expect(endState["todoListId2"].every(t => t.id !== "2")).toBeTruthy();
});

test('correct task should be added to correct array', () => {
    const task = {
        todoListId: "todoListId2",
        title: "juice",
        status: TaskStatuses.New,
        addedDate: "",
        deadline: "",
        description: "",
        order: 0,
        priority: 0,
        startDate: "",
        id: "id",
    }
    const action = addTask.fulfilled(task, "requestId", {title: task.title, todoListId: task.todoListId});
    const endState = tasksReducer(startState, action);

    expect(endState["todoListId1"].length).toBe(3);
    expect(endState["todoListId2"].length).toBe(4);
    expect(endState["todoListId2"][0].id).toBeDefined();
    expect(endState["todoListId2"][0].title).toBe("juice");
    expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    let updateModel = {taskId: "2", model: {status: TaskStatuses.Completed}, todoListId: "todoListId2"};
    const action = updateTask.fulfilled(updateModel, "requestId", updateModel);
    const endState = tasksReducer(startState, action);


    expect(endState["todoListId2"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todoListId1"][0].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
    let updateModel = {taskId: "2", model: {title: "MilkyWay"}, todoListId: "todoListId2"}
    const action = updateTask.fulfilled(updateModel, "requestId",updateModel);
    const endState = tasksReducer(startState, action);

    expect(endState["todoListId2"][1].title).toBe("MilkyWay");
    expect(endState["todoListId1"][1].title).toBe("JS");
});

test('new property with new array should be added when new todoList is added', () => {
    const action = addTodoList.fulfilled({todoList: {
        id: "1.2",
        title: "new todoList",
        order: 0,
        addedDate: ""
    }}, "requestId", "new todoList")
    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
    if(!newKey) {
        throw Error("new key should be added");
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todoListId should be deleted', () => {

    const action = removeTodoList.fulfilled({todoListId: "todoListId2"}, "requestId", "todoListId2");
    const endState = tasksReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todoListId2"]).toBeUndefined();
});

test('empty arrays should be added when we set todoLists', () => {
    const action = fetchTodoLists.fulfilled({todoLists: [
        {id: "1", title: "title1", order: 0, addedDate: ""},
        {id: "2", title: "title2", order: 1, addedDate: ""}
    ]}, "requestId", undefined)

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(2)
    expect(endState['1']).toStrictEqual([])
    expect(endState['2']).toStrictEqual([])
})

test('tasks should be added for todoList.', () => {
    // const action = setTasksAC({tasks: startState["todoListId1"], todoListId: "todoListId1"})
    const action = fetchTasks.fulfilled({tasks: startState["todoListId1"],
        todoListId: "todoListId1"}, "", "todoListId1")

    const endState = tasksReducer({
        "todoListId2": [],
        "todoListId1": [],
    }, action)

    expect(endState["todoListId1"].length).toBe(3)
    expect(endState["todoListId2"].length).toBe(0)
})