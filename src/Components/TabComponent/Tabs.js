import React, {useEffect, useState} from "react";
import { useAppContext } from "../../Context/AppContext";
import '../../css/App.css';
import TodoList from "./Contents/TodoList/TodoList";
import ChatModal from "../Modal/ChatModal";

const Tabs = () => {
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("Search");
    const [boardPairs, setBoardPairs] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const [isChatModalOpen, setChatModalOpen] = useState({});
    // const { setSelectedTab } = useAppContext();
    // const { setContentsComponents } = useAppContext();
    const { selectedTab, setSelectedTab, setContentsComponents } = useAppContext();

    const onBlur = () => {
        if (!placeholder) setPlaceholder("Search");
    };

    const handleTabClick = (mainBoard) => {
        setSelectedTab(mainBoard);
    };

    useEffect(() => {
        setChatModalOpen({});
    }, [selectedTab]);

    const handleAddBoardClick = () => {
        if (newBoardName.trim() !== "") {
            const newBoard = { mainBoard: newBoardName };
            setBoardPairs((prevPairs) => [
                ...prevPairs,
                // { mainBoard: newBoardName }
                newBoard
            ]);
            setContentsComponents((prevComponents) => [
                ...prevComponents,
                { tab: newBoardName, component: () => <TodoList mainBoard={newBoardName} /> }
            ]);
            setSelectedTab(newBoardName);
            setChatModalOpen((prev) => ({ ...prev, [newBoardName]: false }));
            setNewBoardName("");
        }
    };

    const handleChatClick = (mainBoard) => {
        // setChatModalOpen(true);
        setChatModalOpen((prev) => ({ ...prev, [mainBoard]: true }));
    }

    return (
        <div className="Tabs">
            <div>
                <ul className="nav">
                    {boardPairs.map(({ mainBoard }, index) => (
                        <li
                            key={index}
                            onClick={() => handleTabClick(mainBoard)}
                            className={selectedTab === mainBoard ? "active" : ""}
                        >
                            {mainBoard}
                            {selectedTab === mainBoard && (
                                <button
                                    className={`btn_chat ${ selectedTab === mainBoard ? "active" : "" }`}
                                    onClick={() => handleChatClick(mainBoard)}
                                >
                                    Chat!
                                </button>
                            )}
                            {isChatModalOpen[mainBoard] && (
                                <ChatModal
                                    chatModalName={mainBoard}
                                    onClose={() =>
                                        setChatModalOpen((prev) => ({
                                            ...prev,
                                            [mainBoard]: false,
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