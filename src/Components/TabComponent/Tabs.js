import React, {useEffect, useState} from "react";
import { useAppContext } from "../../Context/AppContext";
import '../../css/App.css';
import TodoList from "./Contents/TodoList/TodoList";
import axios from "axios";

const Tabs = () => {
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("Search");
    const [boardPairs, setBoardPairs] = useState([]);
    const [newBoardName, setNewBoardName] = useState("");
    const { setSelectedTab } = useAppContext();
    const { setContentsComponents } = useAppContext();
    const onBlur = () => {
        if (!placeholder) setPlaceholder("Search");
    };

    const handleTabClick = (mainBoard) => {
        setSelectedTab(mainBoard);
    };

    const fetchBoards = async () => {
        try {
            const response = await axios.get('/api/boards');
            setBoardPairs(response.data.map(board => ({ mainBoard: board.mainBoard })));
        } catch (error) {
            console.error('보드 목록 가져오기 중 에러 발생:', error);
        }
    };

    const handleAddBoardClick = async() => {
        if (newBoardName.trim() !== "") {
            try{
                await axios.post('/api/boards', { mainBoard: newBoardName });
                await fetchBoards();

                setSelectedTab(newBoardName);
                setNewBoardName("");
            }catch (error){
                console.error('새로운 보드 추가 중 에러 발생:', error);
            }

        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);
    useEffect(()=>{
        setContentsComponents((prevComponents) => [
            ...prevComponents,
            ...boardPairs.map(board => ({ tab: board.mainBoard, component: () => <TodoList mainBoard={board.mainBoard} /> })),
        ]);
    },[boardPairs,setContentsComponents]);

    return (
        <div className="Tabs">
            <div>
                <ul className="nav">
                    {boardPairs.map(({ mainBoard }, index) => (
                        <li key={index} onClick={() => handleTabClick(mainBoard)}>
                            {mainBoard}
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


