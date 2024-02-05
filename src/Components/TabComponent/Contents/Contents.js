import React from "react";
import { useAppContext } from "../../../Context/AppContext";

import '../../../css/App.css';

import TodoList from "./TodoList";
import Today from "./Today";
import Login from "../../Login/Login";
import Join from "../../Join/Join";

const Contents = () => {
    const { selectedTab } = useAppContext();

    return (
        <div className="Contents">
            { selectedTab === "Login" && <Login /> }
            { selectedTab === "Join" && <Join /> }
            { selectedTab === "TodoList" && <TodoList /> }
            { selectedTab === "Today" && <Today /> }
        </div>
    );
}

export default Contents;