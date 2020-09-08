import {v1} from "uuid";
import {
    addTodoListAC, changeTodoListEntityStatusAC, changeTodoListFilterAC,
    changeTodoListTitleAC, FilterValuesType,
    removeTodoListAC, setTodoListsAC, TodoListDomainType,
    todoListsReducer,
} from "./todoLists-reducer";
import {RequestStatusType} from "../../app/app-reducer";

let todoListId1: string;
let todoListId2: string;
let startState: Array<TodoListDomainType>

beforeEach(() => {
    todoListId1 = v1();
    todoListId2 = v1();

    startState = [
        {id: todoListId1, title: "What to learn", filter: "all", order: 0, addedDate: "", entityStatus: "idle"},
        {id: todoListId2, title: "What to buy", filter: "all", order: 1, addedDate: "", entityStatus: "idle"},
    ];
})

test('correct todoList should be removed', () => {
    const endState = todoListsReducer(startState, removeTodoListAC(todoListId1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todoListId2);
})

test('correct todoList should be added', () => {
    let todoList = {
        id: "1.2",
        title: "New TodoList",
        order: 0,
        addedDate: ""
    };

    const endState = todoListsReducer(startState, addTodoListAC(todoList));

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(todoList.title);
    expect(endState[0].filter).toBe("all");
    expect(endState[0].id).toBeDefined();
})

test('correct todoList should change itself name', () => {
    let newTodoListTitle = "New TodoList"

    const endState = todoListsReducer(startState, changeTodoListTitleAC(todoListId2,newTodoListTitle));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
})

test('correct filter of todoList should be changed', () => {
    let newFilter: FilterValuesType = "completed";

    const endState = todoListsReducer(startState, changeTodoListFilterAC(newFilter, todoListId2));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})

test('todoLists should be set to the state', () => {
    const endState = todoListsReducer([], setTodoListsAC(startState));

    expect(endState.length).toBe(2);
})

test('correct entity status of todoList should be changed', () => {
    let newStatus: RequestStatusType = "loading";

    const endState = todoListsReducer(startState, changeTodoListEntityStatusAC(todoListId2, newStatus));

    expect(endState[0].entityStatus).toBe("idle");
    expect(endState[1].entityStatus).toBe(newStatus);
})