import React from "react";
import Tabs from "../TabComponent/Tabs";
import Header from "../Header/Header";
import Contents from "../TabComponent/Contents/Contents";

import '../../css/App.css';

const Home = ({ loggedInUserInfo }) => {
    return (
        <div className="Home">
                <>
                    <Header />
                    <Tabs userInfo={loggedInUserInfo.userInfo} />
                    <Contents userInfo={loggedInUserInfo.userInfo} />
                </>
        </div>
    );
}

export default Home;