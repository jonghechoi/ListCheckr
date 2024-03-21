import React, {useEffect, useState} from "react";

import '../../css/MemberAddModal.css'
import axios from "axios";

const MemberAddModal = ({ _id, onClose }) => {
    const [joinMemberUId, setJoinMemberUId] = useState("");
    const [userId, setUserId] = useState("");
    const [accessToken, setAccessToken] = useState("");

    const apiInstance = axios.create({ baseURL: "http://localhost:8083" });

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");

        setUserId(JSON.parse(userInfo).id);
        setAccessToken(JSON.parse(userInfo).token);
    }, []);

    const handleModalClick = (e) => {
        e.stopPropagation();
    };

    const handleClose = () => {
        onClose(_id);
    }

    const handleMemberAdd = async (e) => {
        if (e.key === 'Enter') {
            try {
                // 그룹 멤버 추가를 위해 boardId와 사용자 uid 전달
                const response = await apiInstance.post(`/api/user/${userId}/group`, {
                    bid: _id,
                    uid: joinMemberUId
                }, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                });
            } catch (error) {
                if(error.response && error.response.data) {
                    alert(error.response.data);
                }
                else {
                    console.error('멤처 추가 중 에러 발생:', error);
                }
            }
        }
    }

    return (
        <div className="modal-member-add-overlay">
            <div className="modal-member-add-container" onClick={handleModalClick}>
                <p>추가할 유저를 입력해 주세요.</p>
                <input
                    type="text"
                    value={joinMemberUId}
                    onChange={(e) => setJoinMemberUId(e.target.value)}
                    onKeyDown={handleMemberAdd}
                />
                <button onClick={handleClose}>Modal Close</button>
            </div>
        </div>
    )
}

export default MemberAddModal;