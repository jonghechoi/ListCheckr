import React, {useEffect, useRef, useState} from "react";
import { MdAdd } from 'react-icons/md';
import { useAppContext } from "../../Context/AppContext";
// import '../../css/App.css';
import '../../css/Tabs.css';
import Board from "./Contents/TodoList/Board";
import ChatModal from "../Modal/ChatModal";
import axios from "axios";
import { useBoardContext } from "../../Context/BoardContext";

const Tabs = () => {
    const [boardPairs, setBoardPairs] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const [isChatModalOpen, setChatModalOpen] = useState({});
    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const contentRef = useRef(null);

    const { setContentsComponents, contentsComponents, selectedBoardId, setSelectedBoardId } = useAppContext();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (contentRef.current && !contentRef.current.contains(e.target)) {
                setIsAddingBoard(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleTabClick =  async (_id) => {
        const isTabAlreadyExists = contentsComponents.some(component => component.tab === _id);

        // setChatModalOpen({}); // 채팅 모달 초기화
        if (!isTabAlreadyExists) {
            try {
                const todoListResponse = await axios.get(`/api/boards/${_id}/todolist`);
                const todoList = todoListResponse.data;

                setContentsComponents(prevComponents => [
                    ...prevComponents,
                    {
                        tab: _id,
                        title: todoList && todoList.length > 0 ? todoList[0].title : null,
                        component: () => (
                            <Board
                                boardId={_id}
                                // todoListIds={todoList.map((list) => list._id)}
                                title={todoList && todoList.length > 0 ? todoList[0].title : null}
                            />
                        ),
                    },
                ]);
                setSelectedBoardId(_id);
            } catch (error) {
                console.error('할 일 목록 가져오기 중 에러 발생:', error);
            }
        } else {
            setSelectedBoardId(_id);
        }
    };

    const fetchBoards = async () => {
        try {
            const response = await axios.get('/api/boards');

            const boardInfoArray = response.data.map(board => ({
                _id: board._id,
                mainBoard: board.mainBoard
            }));

            setBoardPairs(boardInfoArray);

        } catch (error) {
            console.error('보드 목록 가져오기 중 에러 발생:', error);
        }
    };

    const handleAddBoardClick = async() => {
        if (newBoardName.trim() !== "") {
            try {
                // API 요청 막기 위한 주석
                await axios.post('/api/boards', { mainBoard: newBoardName });
                setNewBoardName("");
                setIsAddingBoard(false);
            } catch (error){
                if (error.response && error.response.status === 400 && error.response.data.error === 'existingBoard'){
                    alert('이미 존재하는 보드 이름입니다. 다른 이름을 입력하세요.');
                } else {
                    console.error('새로운 보드 추가 중 에러 발생:', error);
                }
            } finally {
                await fetchBoards();
            }
        } else {
            alert('보드 이름을 입력하세요.');
        }
    };

    const handleChatClick = (_id) => {
        // setChatModalOpen(true);
        setChatModalOpen((prev) => ({ ...prev, [_id]: true }));
    }

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleRenameBoard = async (_id, newBoardName) => {
        try {
            // API 요청 막기 위한 주석
            await axios.patch(`/api/boards/${_id}`, { mainBoard: newBoardName });
            await fetchBoards();
        } catch (error) {
            console.error('보드 이름 변경 중 에러 발생:', error);
        }
    };

    const handleDeleteBoard = async (_id) => {
        try {
            // API 요청 막기 위한 주석
            await axios.delete(`/api/boards/${_id}`);
            if (selectedBoardId === _id) {
                setContentsComponents([]);
                setSelectedBoardId(null);
            }
            await fetchBoards();
        } catch (error) {
            console.error('보드 삭제 중 에러 발생:', error);
        }
    };
    return (
        <div className="Tabs">
            <div className="webapp">ListCheckr</div>
            <div>
                <ul className="nav">
                    {boardPairs.map(({ _id, mainBoard }, index) => (
                        <li key={index} className={selectedBoardId === _id ? "active" : ""} onClick={() => handleTabClick(_id)}>
                            <span>{mainBoard}</span>
                            {selectedBoardId === _id && (
                                <div className="button-group">
                                    <button onClick={() => handleChatClick(_id)}>
                                        Chat!
                                    </button>
                                    <button onClick={() => handleRenameBoard(_id, prompt('Enter new board name'))}>
                                        Rename
                                    </button>
                                    <button onClick={() => handleDeleteBoard(_id)}>
                                        Delete
                                    </button>

                                </div>
                            )}
                            {isChatModalOpen[_id] && (
                                <ChatModal
                                    chatModalName={mainBoard}
                                    onClose={() =>
                                        setChatModalOpen((prev) => ({
                                            ...prev,
                                            [_id]: false,
                                        }))
                                    }
                                />
                            )}
                        </li>
                    ))}
                    <li>
                        {isAddingBoard ? (
                            <form className="BoardInsert" >
                                <div className="form-content" ref={contentRef}>
                                    <input
                                        type="text"
                                        value={newBoardName}
                                        onChange={(e) => setNewBoardName(e.target.value)}
                                        placeholder="Enter Board Name"
                                    />
                                    <button className="insert" type="button" onClick={handleAddBoardClick}><MdAdd /></button>
                                </div>
                            </form>
                        ) : (
                        <button className="add-board-button" onClick={() => setIsAddingBoard(true)}>+ Add Board</button>
                        )}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Tabs;