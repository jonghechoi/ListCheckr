import React from "react";
import { useAppContext } from "../../../Context/AppContext";

import '../../../css/App.css';

import TodoList from "../Contents/TodoList/TodoList";
import Today from "./Today";
import Login from "../../Login/Login";
import Join from "../../Join/Join";

const Contents = () => {
    const { selectedTab, contentsComponents } = useAppContext();

    const components = {
        Login: <Login />,
        Join: <Join />,

        ...contentsComponents.reduce((acc, { tab, component }) => {
            acc[tab] = React.createElement(component);;
            return acc;
        }, {})
    };
    return (
        <div className="Contents">
            {/*{ selectedTab === "Login" && <Login /> }*/}
            {/*{ selectedTab === "Join" && <Join /> }*/}
            {/*{ selectedTab === "TodoList" && <TodoList /> }*/}
            {/*{ selectedTab === "Today" && <Today /> }*/}
            {components[selectedTab]}
        </div>
    );
}

export default Contents;