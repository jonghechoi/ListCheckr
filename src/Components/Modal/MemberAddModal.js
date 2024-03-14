import React, {useState} from "react";

import '../../css/MemberAddModal.css'
import axios from "axios";

const MemberAddModal = ({ _id, onClose }) => {
    const [joinMemberId, setJoinMemberId] = useState("");

    const handleModalClick = (e) => {
        e.stopPropagation(); // 모달 영역을 클릭해도 부모 컴포넌트에 이벤트가 전달되지 않도록 함
    };

    const handleClose = () => {
        onClose(_id);
    }

    const handleMemberAdd = async (e) => {
        if (e.key === 'Enter') {
            try {
                // 그룹 멤버 추가를 위해 boardId와 사용자 uid 전달
                const response = await axios.patch(`http://localhost:8083/api/user/${_id}/member`, { joinMemberId: joinMemberId });

                console.log("그룹 멤버 추가 응답 : ", response);
            } catch (error) {
                console.error('멤처 추가 중 에러 발생:', error);
            }
        }
    }

    return (
        <div className="modal-member-add-overlay">
            <div className="modal-member-add-container" onClick={handleModalClick}>
                <p>추가할 유저를 선택해 주세요.</p>
                <input
                    type="text"
                    value={joinMemberId}
                    onChange={(e) => setJoinMemberId(e.target.value)}
                    onKeyDown={handleMemberAdd}
                />
                <button onClick={handleClose}>Modal Close</button>
            </div>
        </div>
    )
}

export default MemberAddModal;