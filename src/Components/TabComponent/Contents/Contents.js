import React, {useEffect} from "react";
import { useAppContext } from "../../../Context/AppContext";
import '../../../css/App.css';
import Login from "../../Login/Login";
import Join from "../../Join/Join";


const Contents = () => {
    const { selectedBoardId, contentsComponents, todoListId } = useAppContext();
    useEffect(() => {
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