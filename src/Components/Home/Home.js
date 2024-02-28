import React from "react";
import Tabs from "../TabComponent/Tabs";
import Header from "../Header/Header";
import Contents from "../TabComponent/Contents/Contents";

import '../../css/App.css';

const Home = ({ loggedInUserId }) => {
    return (
        <div className="Home">
                <>
                    <Header loggedInUserId={loggedInUserId} />
                    <Tabs />
                    <Contents />
                </>
        </div>
    );
}

export default Home;