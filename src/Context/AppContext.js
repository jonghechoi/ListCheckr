import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState("");
    const [contentsComponents, setContentsComponents] = useState([]);
    const [selectedBoardId, setSelectedBoardId] = useState(null);
    const apiInstance = axios.create({ baseURL: "http://localhost" });

    const contextValue = {
        selectedTab,
        setSelectedTab,
        selectedBoardId,
        setSelectedBoardId,
        contentsComponents,
        setContentsComponents,
        apiInstance,
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