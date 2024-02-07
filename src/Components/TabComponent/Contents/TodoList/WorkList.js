import WorkListItem from "./WorkListItem";
// import './WorkList.scss'
const WorkList = ({ todos, onRemove, onToggle }) => {
    return (
        <div className="WorkList">
            {todos.map((todo) => (
                <WorkListItem
                    todo={todo}
                    key={todo.id}
                    onRemove={onRemove}
                    onToggle={onToggle}
                />
            ))}
        </div>
    );
};

export default WorkList;