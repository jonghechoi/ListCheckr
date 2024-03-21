import React, {useEffect} from "react";
import { useAppContext } from "../../../Context/AppContext";
import '../../../css/App.css';

const Contents = ({ userInfo }) => {
    const { selectedBoardId, contentsComponents, todoListId } = useAppContext();

    // useEffect(() => {
    // }, [selectedBoardId, contentsComponents]);

    const components = {
        ...contentsComponents.reduce((acc, { tab, component }) => {
            acc[tab] = React.createElement(component, { userInfo });
            return acc;
        }, {})
    };

    return (
        <div className="Contents">
            {components[selectedBoardId]}
        </div>
    );
}

export default Contents;