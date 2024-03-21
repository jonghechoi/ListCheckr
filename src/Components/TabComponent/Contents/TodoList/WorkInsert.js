import { MdAdd } from 'react-icons/md';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import '../../../../css/WorkInsert.css'
const WorkInsert = ({ onInsert, todoListId, boardId }) => {
    const [subject, setSubject] = useState('');
    const [detail, setDetail] = useState('');
    const [isAddingList, setIsAddingList] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setIsAddingList(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const onChangeSubject = useCallback((e) => {
        setSubject(e.target.value);

    }, [setSubject]);

    const onChangeDetail = useCallback((e) => {
        setDetail(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e) => {
            onInsert(subject, detail, todoListId, boardId);
            setSubject('');
            setDetail('');
            e.preventDefault();
            setIsAddingList(false);
        },
        [onInsert, subject, detail, todoListId, boardId],
    );
    const handleAddListClick = () => {
        setIsAddingList(true);
    };
    return (
        <div className="WorkInsert" >
            <div className = "wrapper" ref={wrapperRef}>
                {isAddingList ? (
                    <>
                        <input
                            placeholder="+Add List"
                            value={subject}
                            onChange={onChangeSubject}
                        />
                        <button className="submit" onClick={onSubmit}>
                            <MdAdd />
                        </button>
                    </>
                ) : (
                <button className="add-List-button" onClick={handleAddListClick}>+ Add Work</button>
                )}
            </div>
        </div>
    );
};

export default WorkInsert;
