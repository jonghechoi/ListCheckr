import React from 'react';
// import './WorkTemplate.scss';

const WorkTemplate = ({ children }) => {
    return (
        <div className="WorkTemplate">
            <div className="app-title">work</div>
            <div className="content">{children}</div>
        </div>
    );
};

export default WorkTemplate;
