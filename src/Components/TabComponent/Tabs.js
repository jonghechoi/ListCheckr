import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import '../../css/App.css';
import Board from "./Contents/TodoList/Board";
import ChatModal from "../Modal/ChatModal";
import axios from "axios";

const Tabs = () => {
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("Search");
    const [boardPairs, setBoardPairs] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const [isChatModalOpen, setChatModalOpen] = useState({});
    const { setContentsComponents, contentsComponents, selectedBoardId, setSelectedBoardId } = useAppContext();


    const onBlur = () => {
        if (!placeholder) setPlaceholder("Search");
    };

    const handleTabClick = (_id) => {
        const isTabAlreadyExists = contentsComponents.some(component => component.tab === _id);

        // setChatModalOpen({}); // 채팅 모달 초기화
        if (!isTabAlreadyExists) {
            setContentsComponents(prevComponents => [
                ...prevComponents,
                { tab: _id, component: () => <Board boardId={_id} /> },
            ]);
        }
        setSelectedBoardId(_id);
    };

    const fetchBoards = async () => {
        try {
            const response = await axios.get('/api/boards');

            const boardInfoArray = response.data.map(board => ({
                _id: board._id,
                mainBoard: board.mainBoard
            }));

            setBoardPairs(boardInfoArray);

            // if (boardInfoArray.length > 0) {
            //     setSelectedBoardId(boardInfoArray[boardInfoArray.length - 1]._id);
            // }
        } catch (error) {
            console.error('보드 목록 가져오기 중 에러 발생:', error);
        }
    };

    const handleAddBoardClick = async() => {
        if (newBoardName.trim() !== "") {
            try {
                // API 요청 막기 위한 주석
                await axios.post('/api/boards', { mainBoard: newBoardName });
                await fetchBoards();
            } catch (error){
                if (error.response && error.response.status === 400 && error.response.data.error === 'existingBoard'){
                    alert('이미 존재하는 보드 이름입니다. 다른 이름을 입력하세요.');
                } else {
                    console.error('새로운 보드 추가 중 에러 발생:', error);
                }
            }
        }
    };

    const handleChatClick = (_id) => {
        // setChatModalOpen(true);
        setChatModalOpen((prev) => ({ ...prev, [_id]: true }));
    }

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <div className="Tabs">
            <div>
                <ul className="nav">
                    {boardPairs.map(({ _id, mainBoard }, index) => (
                        <li
                            key={index}
                            onClick={() => handleTabClick(_id)}
                            className={selectedBoardId === _id ? "active" : ""}
                        >
                            {mainBoard}
                            {selectedBoardId === _id && (
                                <button
                                    className={`btn_chat ${ selectedBoardId === _id ? "active" : "" }`}
                                    onClick={() => handleChatClick(_id)}
                                >
                                    Chat!
                                </button>
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
                        <input
                            type="text"
                            value={newBoardName}
                            onChange={(e) => setNewBoardName(e.target.value)}
                            placeholder="Enter Board Name"
                        />
                        <button onClick={handleAddBoardClick}>+ Add Board</button>
                    </li>
                </ul>
            </div>

            <div>
                <input
                    className="Search"
                    type="text"
                    value={search}
                    placeholder={placeholder}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setPlaceholder("")}
                    onBlur={onBlur}
                />
            </div>
        </div>
    );
};

export default Tabs;