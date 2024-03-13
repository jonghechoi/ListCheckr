// AppContext.js

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState("Login");
    const [contentsComponents, setContentsComponents] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null);



    const contextValue = {
        selectedTab,
        setSelectedTab,
        contentsComponents,
        setContentsComponents,
        selectedBoardId,
        setSelectedBoardId,

    };

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
