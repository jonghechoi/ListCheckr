import React from "react";
import Tabs from "../TabComponent/Tabs";
import Header from "../Header/Header";
import Contents from "../TabComponent/Contents/Contents";

import '../../css/App.css';

const Home = () => {
    return (
        <div className="Home">
            <Tabs />
            <Header />
            <Contents />
        </div>
    );
}

export default Home;