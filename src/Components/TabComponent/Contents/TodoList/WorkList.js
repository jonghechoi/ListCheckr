import WorkListContent from "./WorkListContent";
import '../../../../css/WorkList.css'
import axios from "axios";
import {useEffect, useState} from "react";
import {useAppContext} from "../../../../Context/AppContext";
import WorkInsert from "./WorkInsert";
const WorkList = ({ works, todoListId }) => {
    const [loadedWorks, setLoadedWorks] = useState([]);
    const fetchWorks = async () => {
        try {
            const worksResponse = await axios.get(`/api/boards/${selectedBoardId}/todolist/${todoListId}/work`);
            setLoadedWorks(worksResponse.data);
        } catch (error) {
            console.error('워크 목록 조회 중 에러 발생:', error);
        }
    };
    const { selectedBoardId } = useAppContext();
    useEffect(() => {

        fetchWorks();
    }, [selectedBoardId, todoListId]);
    const onInsert = async (subject, detail) => {
        try {
            const workResponse = await axios.post(`/api/boards/${selectedBoardId}/todolist/${todoListId}/work`, {
                subject,
                detail: detail || '',
            });
            const newWork = workResponse.data;
            setLoadedWorks(prevWorks => [...prevWorks, newWork]);
        } catch (error) {
            console.error('할 일 추가 중 에러 발생:', error);
        }
    };
    const onRemove = async (workId) => {
        try {
            await axios.delete(`/api/boards/${selectedBoardId}/todolist/${todoListId}/work/${workId}`);

            setLoadedWorks((prevWorks) =>
                prevWorks.filter((work) => work.id !== workId)
            );
            fetchWorks();
        } catch (error) {
            console.error('work 삭제 중 에러발생:', error);
        }
    };
    const onToggle = async (workId) => {
        try {
            const updatedWorks = loadedWorks.map((work) =>
                work._id === workId ? { ...work, checked: !work.checked } : work
            );

            await axios.patch(`/api/boards/${selectedBoardId}/todolist/${todoListId}/work/${workId}/checked`, {
                checked: updatedWorks.find((work) => work._id === workId)?.checked,
            });

            setLoadedWorks(updatedWorks);
        } catch (error) {
            console.error('작업 토글 중 에러 발생:', error);
        }
    };
    const onUpdateSubject = () => {
        fetchWorks();
    }
    return (
        <div className="WorkList">
            {loadedWorks.map((work) => (
                <WorkListContent
                    key={work._id}
                    work={work}
                    onRemove={() => onRemove(work._id)}
                    onUpdateSubject={onUpdateSubject}
                    onToggle={onToggle}
                />
            ))}
            <WorkInsert onInsert={onInsert} todoListId={todoListId} boardId={selectedBoardId} />
        </div>
    );
};

export default WorkList;