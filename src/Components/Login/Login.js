import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import axios from "axios";
import { Link } from 'react-router-dom';
import Tabs from "../TabComponent/Tabs";
import Header from "../Header/Header";
import Contents from "../TabComponent/Contents/Contents";

const Login = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { setSelectedTab } = useAppContext();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8081/user/login', {
                id: id,
                password: password
            });
            console.log("Login Success");
        }
        catch (error) {
            console.log("Login Fail");
        }
    }

    const handleJoin = (joinClicked) => { setSelectedTab(joinClicked); }

    return (
        <div className="login">
            <div>
                <input
                    type="text"
                    value={id}
                    placeholder="ID"
                    onChange={(e) => setId(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    value={password}
                    placeholder="PASSWORD"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <button onClick={handleLogin}>로그인</button>
                <button onClick={() => handleJoin("Join")}>회원가입</button>
            </div>
        </div>
    );
};

export default Login;