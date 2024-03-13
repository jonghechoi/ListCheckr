import React, {useEffect, useState} from 'react';
import '../../../../css/WorkTemplate.css';
import { useAppContext } from "../../../../Context/AppContext"
import { useBoardContext } from "../../../../Context/BoardContext";
import axios from "axios";
import { FiEdit, FiTrash2, FiCheck } from 'react-icons/fi';

    const WorkTemplate = ({ children, todoListId, onListDelete}) => {
    const { selectedBoardId } = useAppContext();
    const { setTitle } = useBoardContext();

    const [editing, setEditing] = useState(false);
    const [inputTitle, setInputTitle] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetchTitle();
            } catch (error) {
                console.error('에러 발생:', error);
            }
        };

        fetchData();
    }, [selectedBoardId, todoListId]);
    const fetchTitle = async () => {
        try {
            const response = await axios.get(`/api/boards/${selectedBoardId}/todolist/${todoListId}/title`);
            setTitle(response.data.title)
            setInputTitle(response.data.title);
        } catch (error) {
            console.error('제목 조회 중 에러 발생:', error);
        }
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setInputTitle(newTitle);
    };

    const handleAddChangeClick = async () => {
        try {
            if (editing) {
                await axios.patch(`/api/boards/${selectedBoardId}/todolist/${todoListId}/title`, {title : inputTitle});
            }
            await fetchTitle();
            setEditing(!editing);
        } catch (error) {
            console.error('제목 변경 중 에러 발생:', error);
        }
    };

    const handleListDeleteClick = async () => {
        try {
            await axios.delete(`/api/boards/${selectedBoardId}/todolist/${todoListId}`);
            onListDelete();
        } catch (error) {
            console.error('리스트 삭제 중 에러 발생:', error);
        }
    };
    return (
        <div className="WorkTemplate">
            <div className="app-title">
                <div className="title">
                    {editing ? (
                        <input
                            type="text"
                            value={inputTitle}
                            onChange={handleTitleChange}
                            placeholder="Add new TodoList"
                        />
                    ) : (
                        <span>{inputTitle}</span>
                    )}
                </div>
                <div className="button-group">
                    <button onClick={handleAddChangeClick}>
                        {editing ? (<><FiCheck /></>) : (<><FiEdit /></>) }
                    </button>
                    <button onClick={handleListDeleteClick}>
                        {editing ? '' : (<><FiTrash2 /></>) }
                    </button>
                </div>
            </div>
            <div className="content">{children}</div>
        </div>
    );
};

export default WorkTemplate;
