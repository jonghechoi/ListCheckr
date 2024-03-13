import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import '../../../../css/WorkListContent.css'
import {useEffect, useRef, useState} from "react";
import axios from "axios";

const WorkListContent = ({ work, onRemove, onToggle, onUpdateSubject }) => {
    const { _id, subject, detail, checked } = work;

    const [isDetailEditing, setIsDetailEditing] = useState(false);
    const [isSubjectEditing, setSubjectEditing] = useState(false);
    const [inputDetail, setInputDetail] = useState(work.detail);
    const [inputSubject, setInputSubject] = useState(work.subject);

    const textareaRef = useRef(null);
    const handleCheckboxClick = async () => {
        try {
            const newChecked = !checked;
            onToggle(_id);
            onUpdateSubject();
        } catch (error) {
            console.error('checkbox 클릭 중 에러발생:', error);
        }
    };
    const handleSubjectClick = () => {
        setSubjectEditing(true);
        setIsDetailEditing(true);
    };
    const handleSubjectInputChange = (e) => {
        const newSubject = e.target.value;
        setInputSubject(newSubject);

    };
    const handleSubjectInputBlur = async () => {
        try {
            if (inputSubject !=="") {
                await axios.patch(`/api/${work._id}/subject`, {subject: inputSubject});
                onUpdateSubject();
            }
            setSubjectEditing(false);
            setIsDetailEditing(false)
        } catch (error) {
            console.error('subject 수정 중 에러발생:', error);
        }
    };
    const handleDetailInputChange = (e) => {
        setInputDetail(e.target.value);
    };

    const handleDetailInputBlur = async () => {
        try {
            if (inputDetail !==""){
                await axios.patch(`/api/${work._id}/detail`, {detail: inputDetail});
                onUpdateSubject();
            }
        } catch (error) {
            console.error('detail 수정 중 에러발생:', error);
        }

        setIsDetailEditing(false);
    };
    const handleOutsideClick = (e) => {
        if (!e.target.closest('.text')) {
            handleSubjectInputBlur(e);
        }
    };
    useEffect(() => {

        if (isSubjectEditing) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isSubjectEditing]);

    useEffect(() => {
        if (textareaRef.current && inputDetail !== work.detail) {
            const { scrollHeight, clientHeight } = textareaRef.current;

            if (scrollHeight > clientHeight) {
                textareaRef.current.style.height = `${scrollHeight}px`;
            } else {
                textareaRef.current.style.height = 'auto';
            }
        }
    }, [inputDetail, work.detail]);
    return (
        <div className={`WorkListContent ${checked ? 'checked' : ''}`}>
            <div
                className={cn('checkbox', { checked: checked })}
                 onClick={handleCheckboxClick}
            >
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
            </div>
            <div className="text" onClick={handleSubjectClick}>
                <div className="subject">
                    {isSubjectEditing ? (
                        <input
                            value={inputSubject}
                            onChange={handleSubjectInputChange}
                            onBlur={handleSubjectInputBlur}
                        />
                    ) : (
                        subject || '기본 주제'
                    )}
                </div>
                <div className="separator" />
                <div className="detail">
                    {isDetailEditing ? (
                        <textarea
                            ref={textareaRef}
                            value={inputDetail}
                            onChange={handleDetailInputChange}
                            onBlur={handleDetailInputBlur}

                        />
                    ) : (
                        detail || ''
                    )}
                </div>
            </div>
            <div className="remove" onClick={() => onRemove(work.id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default WorkListContent;