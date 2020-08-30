import {v1} from "uuid";
import {
    addTodoListAC, changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, setTodoListsAC, TodoListDomainType,
    todoListsReducer,
} from "./todoLists-reducer";


test('correct todoList should be removed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    const startState: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "all", order: 1, addedDate: ""},
    ];

    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test('correct todoList should be added', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let todoList = {
        id: "1.2",
        title: "New TodoList",
        order: 0,
        addedDate: ""
    };

    const startState: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "all", order: 1, addedDate: ""},
    ];

    const endState = todoListsReducer(startState, addTodoListAC(todoList));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todoList.title);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
})

test('correct todoList should change itself name', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newTodoListTitle = "New TodoList"

    const startState: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "all", order: 1, addedDate: ""},
    ];

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListId2,newTodoListTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
})

test('correct filter of todoList should be changed', () => {
    let todoListId1 = v1();
    let todoListId2 = v1();

    let newFilter: FilterValuesType = "completed";

    const startState: Array<TodoListDomainType> = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: todoListId2, title: "What to buy", filter: "all", order: 1, addedDate: ""},
    ];

    const endState = todoListsReducer(startState, changeTodoListFilterAC(newFilter, todoListId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})

test('todoLists should be set to the state', () => {

    const startState: Array<TodoListDomainType> = [
        {id: "todoListId1", title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: "todoListId2", title: "What to buy", filter: "all", order: 1, addedDate: ""},
    ];

    const endState = todoListsReducer([], setTodoListsAC(startState));

    expect(endState.length).toBe(2);
})