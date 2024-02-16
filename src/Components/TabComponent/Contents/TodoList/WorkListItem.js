import {
    MdCheckBoxOutlineBlank,
    MdCheckBox,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import '../../../../css/WorkListItem.css'
const WorkListItem = ({ todo, onRemove, onToggle }) => {
    const { id, text, checked } = todo;

    const handleCheckboxClick = (e) => {
        if (!e.target.classList.contains('text')) {
            onToggle(id);
        }
    };
    return (
        <div className="WorkListItem">
            <div className={cn('checkbox', { checked })} onClick={handleCheckboxClick}>
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                <div className="text">{text}</div>
            </div>
            <div className="remove" onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline />
            </div>
        </div>
    );
};

export default WorkListItem;