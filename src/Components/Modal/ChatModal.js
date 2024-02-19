import React, { useEffect, useRef, useState } from "react";
import '../../css/ChatModal.css';

const ChatModal = ({ chatModalName, onClose }) => {
    const [socketConnected, setSocketConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [sendMsg, setSendMsg] = useState(false);
    const [items, setItems] = useState([]);
    const webSocketUrl = "ws://localhost:8083/api/chat";
    let ws = useRef(null);

    const [boardName, setBoardName] = useState('');

    useEffect(() => {
        if (chatModalName)
            setBoardName(chatModalName);
    }, [chatModalName]);

    const handleKeyDown = (e) => {
        if(e.key === 'Enter') {

        }
    };

    // useEffect(() => {
    //     ws = new WebSocket(webSocketUrl);
    //     ws.current.onopen = () => {
    //         console.log('WebSocket 연결');
    //         setSocketConnected(true);
    //     }
    //     ws.current.onclose = (error) => {
    //         console.log('WebSocket 연결 끊김');
    //     }
    //     ws.current.onerror = (error) => {
    //         console.log(error);
    //     }
    //     ws.current.onmessage = (e) => {
    //         const data = JSON.parse(e.data);
    //         console.log(data);
    //         setItems((prevItems) => [...prevItems, data]);
    //     }
    // }, []);
    //
    // useEffect(() => {
    //     if(socketConnected) {
    //         ws.current.send(
    //             JSON.stringify({
    //                 message: sendMessage
    //             })
    //         )
    //         setSendMsg(true);
    //     }
    // }, [socketConnected]);
    //
    // useEffect(() => {
    //     if (sendMsg) {
    //         ws.current.onmessage = (e) => {
    //             const data = JSON.parse(e.data);
    //             console.log(data);
    //             setItems((prevItems) => [...prevItems, data]);
    //         };
    //     }
    // }, [sendMsg]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    {items.map((item) => {
                        return <div>{ JSON.stringify(item) } </div>
                    })}
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        // placeholder={"대화창"}
                        placeholder={boardName}
                    />
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ChatModal;