import React, { useEffect, useRef, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import '../../css/ChatModal.css';

const ChatModal = ({ chatModalName, onClose }) => {
    const [socketConnected, setSocketConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [sendMsg, setSendMsg] = useState(false);
    const [items, setItems] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const webSocketUrl = "http://localhost:8083/chat/pub";  // 웹소켓 엔드포인트
    const [boardName, setBoardName] = useState('');

    useEffect(() => {
        if (chatModalName) {
            setBoardName(chatModalName);
        }

        const socket = new SockJS(webSocketUrl);
        const stomp = Stomp.over(socket);

        stomp.connect({}, () => {
            console.log('Stomp 연결 성공');
            setSocketConnected(true);

            console.log(`이거 맞지?? + ${chatModalName}`);

            stomp.subscribe(`/topic/${chatModalName}`, (message) => {
                // stomp.subscribe(`/topic/aaa`, (message) => {
                const data = JSON.parse(message.body);
                console.log(data.message);
                setItems((prevItems) => [...prevItems, data.message]);
            });
        });

        setStompClient(stomp);

        return () => {
            // 컴포넌트가 언마운트 될 때 Stomp 연결 해제
            stomp.disconnect();
        };
    }, [chatModalName]);

    // useEffect(() => {
    //     const socket = new SockJS(webSocketUrl);
    //     const stomp = Stomp.over(socket);
    //
    //     stomp.connect({}, () => {
    //         console.log('Stomp 연결 성공');
    //         setSocketConnected(true);
    //
    //         stomp.subscribe(`/topic/${boardName}`, (message) => {
    //         // stomp.subscribe(`/topic/aaa`, (message) => {
    //             const data = JSON.parse(message.body);
    //             console.log(data.message);
    //             setItems((prevItems) => [...prevItems, data.message]);
    //         });
    //     });
    //
    //     setStompClient(stomp);
    //
    //     return () => {
    //         // 컴포넌트가 언마운트 될 때 Stomp 연결 해제
    //         stomp.disconnect();
    //     };
    // }, [boardName, webSocketUrl]);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (socketConnected) {
                stompClient.send(`/chat/pub/topic/${boardName}`, {},
                    JSON.stringify(
                        {
                                type: "TALK",
                                boardId: boardName,
                                sender: "?",
                                message: message,
                                time: Date.now()
                            }
                    )
                );
                setMessage('');
                setSendMsg(true);
            }
        }
    };

    useEffect(() => {
        if (sendMsg) {
            stompClient.onmessage = (e) => {
                const data = JSON.parse(e.body);
                console.log(data);
                setItems((prevItems) => [...prevItems, data]);
            };
        }
    }, [sendMsg]);
    // }, [sendMsg, stompClient]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    {items.map((item, index) => (
                        <div key={index}>{

                                item

                        }</div>
                    ))}
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={boardName}
                    />
                </div>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ChatModal;