import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import '../../css/App.css';

const Tabs = () => {
    const [search, setSearch] = useState("");
    const [placeholder, setPlaceholder] = useState("Search");
    const { setSelectedTab } = useAppContext();

    const onBlur = (e) => { if (!placeholder) setPlaceholder("Search"); }
    const handleTabClick = (tabClicked) => { setSelectedTab(tabClicked); }

    return (
        <div className="Tabs">
            {/*<div>*/}
            {/*    <ul className="nav">*/}
            {/*        <li onClick={() => handleTabClick("Login")}>Login</li>*/}
            {/*    </ul>*/}
            {/*</div>*/}
            <div>
                <input className="Search"
                       type="text"
                       value={search}
                       placeholder={placeholder}
                       onChange={(e) => setSearch(e.target.value)}
                       onFocus={() => setPlaceholder("")}
                       onBlur={onBlur}
                />
            </div>
            <ul className="nav">
                <li onClick={() => handleTabClick("TodoList")}>Main Board</li>
                <li onClick={() => handleTabClick("Today")}>+ Add Board</li>
            </ul>
        </div>
    );
};
export default Tabs;