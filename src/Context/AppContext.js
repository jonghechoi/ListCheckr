import React, { createContext, useContext, useState } from "react";
import axios from 'axios';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [selectedTab, setSelectedTab] = useState("");
    const [contentsComponents, setContentsComponents] = useState([]);
    const apiInstance = axios.create({ baseURL: "http://localhost:8083" });

    const contextValue = {
        selectedTab,
        setSelectedTab,
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
