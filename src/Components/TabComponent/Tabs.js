import React, {useEffect, useRef, useState} from "react";
import { MdAdd } from 'react-icons/md';
import { useAppContext } from "../../Context/AppContext";

import Board from "./Contents/TodoList/Board";
import ChatModal from "../Modal/ChatModal";
import axios from "axios";

import '../../css/Tabs.css';
import MemberAddModal from "../Modal/MemberAddModal";

const Tabs = ({ userInfo }) => {
    const [boardPairs, setBoardPairs] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const [isChatModalOpen, setChatModalOpen] = useState({});
    const [isMemberAddModalOpen, setMemberAddModalOpen] = useState({});
    const [openedChatModalBoardId, setOpenedChatModalBoardId] = useState(null);
    const [isAddingBoard, setIsAddingBoard] = useState(false);
    const contentRef = useRef(null);

    const { setContentsComponents, contentsComponents, selectedBoardId, setSelectedBoardId } = useAppContext();

    const config = userInfo ? {
        headers: {
            Authorization: `Bearer ${userInfo}`
        }
    } : {};
    
    useEffect(() => {
       console.log("token:", userInfo);
    },[userInfo]);
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

        if (!isTabAlreadyExists) {
            try {
                const todoListResponse = await axios.get(`/api/boards/${_id}/todolist`, config);
                const todoList = todoListResponse.data;

                setContentsComponents(prevComponents => [
                    ...prevComponents,
                    {
                        tab: _id,
                        title: todoList && todoList.length > 0 ? todoList[0].title : null,
                        component: () => (
                            <Board
                                boardId={_id}
                                title={todoList && todoList.length > 0 ? todoList[0].title : null}
                                token={userInfo}
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

        // 다른 탭 클릭시 open 되어 있는 ChatModal close
        if(openedChatModalBoardId !== _id) {
            setChatModalOpen((prev) => ({
                ...prev,
                [openedChatModalBoardId]: false
            }));
        }
    };

    const fetchBoards = async () => {
        try {
            const response = await axios.get('/api/boards', config);

            const boardInfoArray = response.data.map(board => ({
                _id: board._id,
                mainBoard: board.mainBoard
            }));
            console.log(boardInfoArray);
            setBoardPairs(boardInfoArray);
        } catch (error) {
            console.error('보드 목록 가져오기 중 에러 발생:', error);
        }
    };

    const handleAddBoardClick = async() => {
        if (newBoardName.trim() !== "") {
            try {
                await axios.post('/api/boards', { mainBoard: newBoardName }, config);
                setNewBoardName("");
                setIsAddingBoard(false);
            } catch (error){
                if(error.response && error.response.status === 403 && error.response.data.error === 'needToPay'){
                    alert('3개 이상의 보드생성은 결제가 필요합니다.');
                } else if (error.response && error.response.status === 400 && error.response.data.error === 'existingBoard'){
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
        setOpenedChatModalBoardId(_id);
        setChatModalOpen((prev) => ({ ...prev, [_id]: true }));
    }

    useEffect(() => {
        fetchBoards();
    }, []);

    const handleRenameBoard = async (_id, newBoardName) => {
        try {
            await axios.patch(`/api/boards/${_id}`, { mainBoard: newBoardName }, config);
            await fetchBoards();
        } catch (error) {
            if (error.response && error.response.status === 403 && error.response.data.error === 'unmatchedMaster'){
                alert('본인이 생성한 보드만 수정할 수 있습니다.');
            } else if ( error.response && error.response.status === 400 && error.response.data.error === 'existingBoard'){
                alert('이미 존재하는 보드 이름입니다. 다른 이름을 입력하세요.');
            } else{
            console.error('보드 이름 변경 중 에러 발생:', error);
            }
        }
    };

    const handleDeleteBoard = async (_id) => {
        try {
            await axios.delete(`/api/boards/${_id}`, config);
            if (selectedBoardId === _id) {
                setContentsComponents([]);
                setSelectedBoardId(null);
            }
            await fetchBoards();
        } catch (error) {
            if (error.response && error.response.status === 405 && error.response.data.error === 'unmatchedMaster'){
                alert('본인이 생성한 보드만 삭제할 수 있습니다.');
            } else{
                console.error('보드 삭제중 에러 발생:', error);
            }
        }
    };

    const handleAddMember = async (_id) => {
        setMemberAddModalOpen((prev) => ({ ...prev, [_id]: true }));
    }

    const closeMemberAddModal = (_id) => {
        setMemberAddModalOpen((prev) => ({ ...prev, [_id]: false }));
    }

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
                                    <button onClick={() => handleAddMember(_id)}>
                                        Member Add
                                    </button>
                                </div>
                            )}
                            {isChatModalOpen[_id] && (
                                <ChatModal
                                    boardId={ _id }
                                    onClose={() =>
                                        setChatModalOpen((prev) => ({
                                            ...prev,
                                            [_id]: false,
                                        }))
                                    }
                                />
                            )}
                            {isMemberAddModalOpen[_id] && (
                                <MemberAddModal _id={_id} onClose={closeMemberAddModal} />
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