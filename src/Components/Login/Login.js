import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import Join from "../Join/Join";

import '../../css/Login.css'

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const { setSelectedBoardId, setContentsComponents } = useAppContext();
    const [isLoggedIn, setLoggedIn] = useState(true);

    const apiInstance = axios.create({ baseURL: "http://localhost:8086" });

    const handleLogin = async () => {
        try {
            const response = await apiInstance.post('api/user/login', {
                uid: id,
                password: password
            });

            onLogin(id, response.headers.get("Authorization"));
            localStorage.setItem("userInfo", JSON.stringify({
                id: id,
                token: response.headers.get("Authorization")
            }))

            setLoggedIn(!isLoggedIn);
            if(isLoggedIn) {
                navigate('/home');
            }

            console.log("Login Success");
        }
        catch (error) {
            console.log("Login Fail");
        }
    }

    const handleJoin = () => {
        setContentsComponents((prevComponents) => [
            ...prevComponents,
            { tab: "Join", component: Join }
        ]);
        navigate('/join');
    }

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
                <button onClick={handleJoin}>회원가입</button>
            </div>
        </div>
    );
};

export default Login;