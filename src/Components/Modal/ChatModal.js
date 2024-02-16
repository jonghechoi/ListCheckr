import React from "react";
import '../../css/ChatModal.css';

const ChatModal = ({ onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    <input type="text" placeholder={"ㅎㅇㅎㅇ"} />
                    <button onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ChatModal;