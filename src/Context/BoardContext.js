import React, { createContext, useContext, useState } from "react";

const BoardContext = createContext();

export const BoardProvider =({children}) => {
    const [todoListId, setTodoListId] = useState();
    const [title, setTitle] = useState();
    const contextValue ={
        todoListId,
        setTodoListId,
        title,
        setTitle,

    }

    return (
        <BoardContext.Provider value={contextValue}>
            {children}
        </BoardContext.Provider>
    );
};

export const useBoardContext = () => {
    return useContext(BoardContext);
}