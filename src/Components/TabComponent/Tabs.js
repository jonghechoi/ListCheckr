// Tabs.js
import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import '../../css/App.css';
import TodoList from "./Contents/TodoList/TodoList";

const Tabs = () => {
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("Search");
    const [boardPairs, setBoardPairs] = useState([]);
    const { setSelectedTab } = useAppContext();
    const { setContentsComponents } = useAppContext();
    const onBlur = () => {
        if (!placeholder) setPlaceholder("Search");
    };

    const handleTabClick = (mainBoard) => {
        setSelectedTab(mainBoard);
    };

    const handleAddBoardClick = () => {
        const newMainBoard = `Main Board${boardPairs.length + 1}`;

        setBoardPairs((prevPairs) => [
            ...prevPairs,
            { mainBoard: newMainBoard }
        ]);
        setContentsComponents((prevComponents) => [
            ...prevComponents,
            { tab: newMainBoard, component: () => <TodoList mainBoard={newMainBoard} /> }
        ]);
        setSelectedTab(newMainBoard);
    };


    return (
        <div className="Tabs">
            <div>
                <ul className="nav">
                    {boardPairs.map(({ mainBoard }, index) => (
                        <li key={index} onClick={() => handleTabClick(mainBoard)}>
                            {mainBoard}
                        </li>
                    ))}
                    <li onClick={handleAddBoardClick}>+ Add Board</li>
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


