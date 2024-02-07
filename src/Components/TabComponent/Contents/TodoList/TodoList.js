import { useCallback, useRef, useState, useEffect } from 'react';
import WorkTemplate from "./WorkTemplate";
import WorkInsert from "./WorkInsert";
import WorkList from "./WorkList";


const TodoList = ({mainBoard}) => {

    useEffect(() => {
        console.log(`TodoList for mainBoard: ${mainBoard}`);
    }, [mainBoard]);

    const [todos, setTodos] = useState([
        {
            id: 1,
            text: 'Todo 앱 기획하기',
            checked: true,
        },
        {
            id: 2,
            text: '프런트 구현해보기',
            checked: true,
        },
        {
            id: 3,
            text: 'DB 연결해보기',
            checked: false,
        },
    ]);

    const nextId = useRef(4);

    const onInsert = useCallback(
        (text) => {
            const todo = {
                id: nextId.current,
                text,
                checked: false,
            };
            setTodos(todos.concat(todo));
            nextId.current += 1;
        },
        [todos],
    );

    const onRemove = useCallback(
        (id) => {
            setTodos(todos.filter((todo) => todo.id !== id));
        },
        [todos],
    );

    const onToggle = useCallback(
        (id) => {
            setTodos(
                todos.map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo,
                ),
            );
        },
        [todos],
    );


    return (
        <div>
                <div>
                    <WorkTemplate>
                        <WorkInsert onInsert={onInsert} />
                        <WorkList todos={todos} onRemove={onRemove} onToggle={onToggle} />
                    </WorkTemplate>
                </div>
        </div>
    );
};

export default TodoList;