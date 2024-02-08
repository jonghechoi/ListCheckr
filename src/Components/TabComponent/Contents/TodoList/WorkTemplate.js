import React, {useState} from 'react';
import '../../../../css/WorkTemplate.css';

const WorkTemplate = ({ children }) => {
    const [title, setTitle] = useState('');
    const [editing, setEditing] = useState(false);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAddChangeClick = () => {
        if (!editing) {
            setTitle('');
        } else if (title.trim() !== "") {

        }
        setEditing(!editing);
    };

    return (
        <div className="WorkTemplate">
            <div className="app-title">
                {editing && (
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter new title"
                    />
                )}
                {!editing && <span>{title || "Add Work"}</span>}
            </div>
            <button onClick={handleAddChangeClick}>
                {editing ? "Submit" : "Change Title"}
            </button>
            <div className="content">{children}</div>
        </div>

    );
};

export default WorkTemplate;
