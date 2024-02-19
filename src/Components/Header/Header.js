import React from "react";

const Header = ({ loggedInUserId }) => {
    return (
        <div className="header">
            <p>{loggedInUserId}님 어서오세요!</p>
        </div>
    );
}

export default Header;