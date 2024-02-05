import React, { useState, useEffect } from "react";
import TodoModal from "../../Modal/TodoModal";
import axios from "axios";

const TodoList = () => {
    const [txt, setTxt] = useState("");
    const [placeholder, setPlaceholder] = useState("New task");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onBlur = () => {
        if (!txt) setPlaceholder("New task");
    }

    const openModal = () => {
        if (isModalOpen === true)
            setIsModalOpen(false);
        if (isModalOpen === false)
            setIsModalOpen(true);
    }
    const closeModal = () => setIsModalOpen(false);

    // Todo listing
    const [lists, setLists] = useState([]);

    useEffect( () => {
        // axios.get('http://localhost:8081/todolists/todolist/users/choi')
        //      .then(response => setLists(response.data));

        async function fetchData(){
            try {
                const response = await axios.get('http://localhost:8081/todolists/todolist/users/choi');
                setLists(response.data);
            }
            catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    return (
        <div className="todo-list">
            <div className="list-item">
                <div>
                    <input
                        className="NewTask"
                        type="text"
                        value={txt}
                        placeholder={placeholder}
                        onChange={(e) => setTxt(e.target.value)}
                        onFocus={() => setPlaceholder("")}
                        onBlur={onBlur}
                    />
                    <button onClick={openModal}>add</button>
                </div>
                <ul>
                    {lists.map(list => (
                        <li key={ list.id }>
                            <div>{ list.contents }</div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="todo-modal">
                <TodoModal isOpen={isModalOpen} closeModal={closeModal} content={txt} />
            </div>
        </div>
    );
}

export default TodoList;