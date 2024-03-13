import { useCallback, useRef, useState, useEffect } from 'react';
import { useAppContext } from "../../../../Context/AppContext"
import WorkTemplate from "./WorkTemplate";
import WorkInsert from "./WorkInsert";
import WorkList from "./WorkList";
import '../../../../css/Board.css'
import axios from "axios";

const Board = () => {
    const { selectedBoardId } = useAppContext();
    const [todoLists, setTodoLists] = useState( []);


    const fetchTodoLists = useCallback(async () => {
        try {
            const response = await axios.get(`/api/boards/${selectedBoardId}/todolist`);
            const todoListsWithTitle = await Promise.all(response.data.map(async (todoList) => {
            const titleResponse = await axios.get(`/api/boards/${selectedBoardId}/todolist/${todoList._id}/title`);


            return {
                _id: todoList._id,
                title: titleResponse.data.title,
                works: todoList.works || [],
            };
            }));
            setTodoLists(todoListsWithTitle);
        } catch (error) {
            console.error('할 일 목록 조회 중 에러 발생:', error);

        }
    }, [selectedBoardId]);
    const onListDelete = () => {
        fetchTodoLists();
    };

    useEffect(() => {
        fetchTodoLists();
    }, [fetchTodoLists, selectedBoardId]);

    const addTodoList = async () => {
        try {
            const response = await axios.post(`/api/boards/${selectedBoardId}/todolist`, { title : `LIST${todoLists.length +1}`});
            const newTodoList = response.data;

            setTodoLists((prevTodoLists) => [...prevTodoLists, newTodoList]);
            fetchTodoLists();
        } catch (error) {
            console.error('할 일 목록 추가 중 에러 발생:', error);
        }
    };

    return (
        <div className="todo-list-container">
            {todoLists && todoLists.map((todoList) => (
                <div key={todoList._id} className="todo-list-item">
                    <WorkTemplate todoListId={todoList._id} onListDelete={onListDelete}>
                        <WorkList
                            works={Array.isArray(todoList.works) ? todoList.works : []}
                            todoListId={todoList._id}
                        />
                    </WorkTemplate>
                </div>
            ))}
            <button className="add-work-button" onClick={addTodoList}>+Add List</button>

        </div>
    );
};

export default Board;