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
    const webSocketUrl = "http://localhost:8084/chat/pub";
    const apiInstance = axios.create({ baseURL: "http://localhost:8084/api/chat/" });
    const [boardName, setBoardName] = useState('');
    const scrollRef = useRef();

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
    }, [chatModalName]);

    const fetchChatHistory = async () => {
        try {
            const response = await apiInstance.get(chatModalName);
            if(response.data == '') {
                return;
            }

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

    useEffect(() => {
        scrollToBottom();
    }, [items]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    return (
        <div className="modal-overlay">
            {/*<div className="modal-container" onClick={(e) => e.stopPropagation()}>*/}
            <div className="modal-container">
                <div className="modal-content" ref={scrollRef}>
                    {items.map((item, index) => (
                        <div className="wrap">
                            <div className="chat me">
                                <div className="icon"><i className="fa-solid fa-user"></i></div>
                                <div className="textbox">{item.content}</div>
                            </div>
                            {/*<div className="chat other">*/}
                            {/*    <div className="icon"><i className="fa-solid fa-user"></i></div>*/}
                            {/*    <div className="textbox">아유~ 너무요너무요! 요즘 어떻게 지내세요?</div>*/}
                            {/*</div>*/}
                        </div>
                    ))}
                </div>
                <div className="input-container">
                    <button onClick={() => {
                        if (stompClient) {
                            stompClient.disconnect(0, {boardId: chatModalName});
                        }
                        onClose();
                    }}>Close</button>
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </div>
        </div>
    );
}

export default ChatModal;