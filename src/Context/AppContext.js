// AppContext.js

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState("Login");
    const [contentsComponents, setContentsComponents] = useState([]);

    const contextValue = {
        selectedTab,
        setSelectedTab,
        contentsComponents,
        setContentsComponents,
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
