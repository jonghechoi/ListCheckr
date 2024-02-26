import React, { useEffect, useRef, useState } from "react";
import Stomp from "stompjs";
import SockJS from "sockjs-client";
import '../../css/ChatModal.css';
import axios from "axios";

const ChatModal = ({ chatModalName, onClose }) => {
    const [socketConnected, setSocketConnected] = useState(false);
    const [message, setMessage] = useState('');
    const [sendMsg, setSendMsg] = useState(false);
    const [items, setItems] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    const webSocketUrl = "http://localhost:8083/chat/pub";
    const apiInstance = axios.create({ baseURL: "http://localhost:8083/api/chat/" });
    const [boardName, setBoardName] = useState('');

    useEffect(() => {
        if (chatModalName) {
            setBoardName(chatModalName);
        }

        const socket = new SockJS(webSocketUrl);
        const stomp = Stomp.over(socket);

        stomp.connect({ boardId : chatModalName, sender : "초기 생성인", createTime :  Date.now() }, () => {
            console.log('Stomp 연결 성공');
            setSocketConnected(true);

            stomp.subscribe(`/topic/${chatModalName}`, (message) => {
                const data = JSON.parse(message.body);
                setItems((prevItems) => [...prevItems, data.messageContent]);
            });
        });

        fetchChatHistory();

        setStompClient(stomp);

        return () => {
            let disconnectHeaders = {
                boardId: chatModalName,
            };
            stomp.disconnect(0, disconnectHeaders);
        };
    }, [chatModalName]);

    const fetchChatHistory = async () => {
        try {
            const response = await apiInstance.get(chatModalName);
            let newItems = response.data.messageContentList.map((content) => (
                {
                    sender: content.sender,
                    content: content.content,
                    sendTime: content.sendTime,
                }
            ));

            setItems((prevItems) => [...prevItems, ...newItems]);
        } catch (error) {
            console.error('채팅 목록 가져오기 중 에러 발생: ', error)
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (socketConnected) {
                stompClient.send(`/chat/pub/topic/${chatModalName}`, { boardId : chatModalName },
                    JSON.stringify({
                            boardId: chatModalName,
                            messageContent: {
                                // 추후 로그인 ID로 변경 필수
                                sender: "b",
                                content: message,
                                sendTime: Date.now()
                            },
                            type: "TALK"
                    })
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
                setItems((prevItems) => [...prevItems, data]);
            };
        }
    }, [sendMsg]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    {items.map((item, index) => (
                        <p
                            key={index}
                            className={item.sender === 'b' ? 'right-align' : 'left-align'}
                        >
                            Sender: {item.sender} Content: {item.content}
                        </p>
                    ))}
                </div>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={boardName}
                />
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

export default ChatModal;