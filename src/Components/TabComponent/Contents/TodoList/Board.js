import { useCallback, useRef, useState, useEffect } from 'react';
import WorkTemplate from "./WorkTemplate";
import WorkInsert from "./WorkInsert";
import WorkList from "./WorkList";
import '../../../../css/TodoList.css'

const Board = ({ boardId }) => {
    const [todoLists, setTodoLists] = useState([]);
    useEffect(() => {
        console.log("Selected Board ID in Board:", boardId);
    }, [boardId]);
    const addTodoList = () => {
        const newTodoList = {
            workId: todoLists.length + 1,
            title: 'AddWork',
            todos: [
                { todoId: 1, text: '새로운 할 일', checked: false },
            ],
        };
        setTodoLists((prevTodoLists) => [...prevTodoLists, newTodoList]);
    };

    const onInsert = (text, todoListId) => {
        setTodoLists((prevTodoLists) =>
            prevTodoLists.map((todoList) =>
                todoList.workId === todoListId
                    ? { ...todoList, todos: [...todoList.todos, { todoId: todoList.todos.length + 1, text, checked: false }] }
                    : todoList
            )
        );
    };

    const onRemove = (todoListId, todoId) => {
        setTodoLists((prevTodoLists) =>
            prevTodoLists.map((todoList) =>
                todoList.workId === todoListId
                    ? { ...todoList, todos: todoList.todos.filter((todo) => todo.todoId !== todoId) }
                    : todoList
            )
        );
    };

    const onToggle = (todoListId, todoId) => {
        setTodoLists((prevTodoLists) =>
            prevTodoLists.map((todoList) =>
                todoList.workId === todoListId
                    ? {
                        ...todoList,
                        todos: todoList.todos.map((todo) =>
                            todo.todoId === todoId ? { ...todo, checked: !todo.checked } : todo
                        ),
                    }
                    : todoList
            )
        );
    };

    return (
        <div className="todo-list-container">
            {todoLists.map((todoList) => (
                <div key={todoList.workId} className="todo-list-item">
                    <WorkTemplate>
                        <WorkList
                            todos={todoList.todos}
                            onRemove={(todoId) => onRemove(todoList.workId, todoId)}
                            onToggle={(todoId) => onToggle(todoList.workId, todoId)}
                        />
                        <WorkInsert onInsert={(text) => onInsert(text, todoList.workId)} />
                    </WorkTemplate>
                </div>
            ))}
            <button className="add-work-button" onClick={addTodoList}>+AddWork</button>
        </div>
    );
};

export default Board;