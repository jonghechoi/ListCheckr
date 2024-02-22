import React, {useEffect} from "react";
import { useAppContext } from "../../../Context/AppContext";

import '../../../css/App.css';

import Board from "./TodoList/Board";
import Today from "./Today";
import Login from "../../Login/Login";
import Join from "../../Join/Join";
import {tab} from "@testing-library/user-event/dist/tab";

const Contents = () => {
    const { selectedBoardId, contentsComponents } = useAppContext();
    useEffect(() => {
        console.log("Selected Board ID in Contents:", selectedBoardId);
        console.log("contentsComponents:", contentsComponents);
    }, [selectedBoardId, contentsComponents]);
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
            {/*{ selectedTab === "Board" && <Board /> }*/}
            {/*{ selectedTab === "Today" && <Today /> }*/}
            {components[selectedBoardId]}
        </div>
    );


}

export default Contents;