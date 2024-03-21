import React, {useEffect, useState} from "react";

const Header = () => {
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        setUserId(JSON.parse(userInfo).id);
    }, []);

    return (
        <div className="header">
            <p>{userId}님 어서오세요!</p>
        </div>
    );
}

export default Header;