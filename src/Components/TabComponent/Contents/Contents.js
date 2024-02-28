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
        ...contentsComponents.reduce((acc, { tab, component }) => {
            acc[tab] = React.createElement(component);;
            return acc;
        }, {})
    };
    return (
        <div className="Contents">
            {components[selectedTab]}
        </div>
    );
}

export default Contents;