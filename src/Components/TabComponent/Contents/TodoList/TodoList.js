import { useCallback, useRef, useState, useEffect } from 'react';
import WorkTemplate from "./WorkTemplate";
import WorkInsert from "./WorkInsert";
import WorkList from "./WorkList";
import '../../../../css/TodoList.css'

const TodoList = ({ mainBoard }) => {
    const [todoLists, setTodoLists] = useState([]);

    const addTodoList = () => {
        const newTodoList = {
            id: todoLists.length + 1,
            title: 'AddWork',
            todos: [
                { id: 1, text: '새로운 할 일', checked: false },
            ],
        };
        setTodoLists((prevTodoLists) => [...prevTodoLists, newTodoList]);
    };

    const onInsert = (text, todoListId) => {
        setTodoLists((prevTodoLists) =>
            prevTodoLists.map((todoList) =>
                todoList.id === todoListId
                    ? { ...todoList, todos: [...todoList.todos, { id: todoList.todos.length + 1, text, checked: false }] }
                    : todoList
            )
        );
    };

    const onRemove = (todoListId, todoId) => {
        setTodoLists((prevTodoLists) =>
            prevTodoLists.map((todoList) =>
                todoList.id === todoListId
                    ? { ...todoList, todos: todoList.todos.filter((todo) => todo.id !== todoId) }
                    : todoList
            )
        );
    };

    const onToggle = (todoListId, todoId) => {
        setTodoLists((prevTodoLists) =>
            prevTodoLists.map((todoList) =>
                todoList.id === todoListId
                    ? {
                        ...todoList,
                        todos: todoList.todos.map((todo) =>
                            todo.id === todoId ? { ...todo, checked: !todo.checked } : todo
                        ),
                    }
                    : todoList
            )
        );
    };

    return (
        <div className="todo-list-container">
            {todoLists.map((todoList) => (
                <div key={todoList.id} className="todo-list-item">
                    <WorkTemplate>
                        <WorkList
                            todos={todoList.todos}
                            onRemove={(todoId) => onRemove(todoList.id, todoId)}
                            onToggle={(todoId) => onToggle(todoList.id, todoId)}
                        />
                        <WorkInsert onInsert={(text) => onInsert(text, todoList.id)} />
                    </WorkTemplate>
                </div>
            ))}
            <button className="add-work-button" onClick={addTodoList}>+AddWork</button>
        </div>
    );
};

export default TodoList;