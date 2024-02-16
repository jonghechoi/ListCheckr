import React from "react";

const TodoModal = ({ isOpen, closeModal, content }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-container" style={{ display:isOpen ? "block" : "none" }}>
            <input type="text" placeholder={ content } disabled />
            <textarea placeholder="Todo1"></textarea>
            <p>Image Put</p>
            <div className="btn-modal">
                <button onClick={ closeModal }>Close</button>
            </div>
        </div>
    );
}

export default TodoModal;

