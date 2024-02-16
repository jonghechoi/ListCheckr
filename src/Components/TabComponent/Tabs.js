import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import '../../css/App.css';
import TodoList from "./Contents/TodoList/TodoList";
import ChatModal from "../Modal/ChatModal";

const Tabs = () => {
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("Search");
    const [boardPairs, setBoardPairs] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const [isChatModalOpen, setChatModalOpen] = useState(false);
    const { setSelectedTab } = useAppContext();
    const { setContentsComponents } = useAppContext();
    const onBlur = () => {
        if (!placeholder) setPlaceholder("Search");
    };

    const handleTabClick = (mainBoard) => {
        setSelectedTab(mainBoard);
    };

    const handleAddBoardClick = () => {
        if (newBoardName.trim() !== "") {
            setBoardPairs((prevPairs) => [
                ...prevPairs,
                { mainBoard: newBoardName }
            ]);
            setContentsComponents((prevComponents) => [
                ...prevComponents,
                { tab: newBoardName, component: () => <TodoList mainBoard={newBoardName} /> }
            ]);
            setSelectedTab(newBoardName);
            setNewBoardName("");
        }
    };

    const handleChatClick = () => {
        setChatModalOpen(true);
    }

    return (
        <div className="Tabs">
            <div>
                <ul className="nav">
                    {boardPairs.map(({ mainBoard }, index) => (
                        <li key={index} onClick={() => handleTabClick(mainBoard)}>
                            {mainBoard}
                            <button className="btn_chat" onClick={handleChatClick}>Chat!</button>
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

            {isChatModalOpen && <ChatModal onClose={() => setChatModalOpen(false)} />}
        </div>
    );
};

export default Tabs;


