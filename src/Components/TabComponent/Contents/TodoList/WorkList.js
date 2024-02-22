import WorkListItem from "./WorkListItem";
import '../../../../css/WorkList.css'
const WorkList = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="WorkList">
            {todos.map((todo) => (
                <WorkListItem
                    key={todo.todoId}
                    todo={todo}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default WorkList;