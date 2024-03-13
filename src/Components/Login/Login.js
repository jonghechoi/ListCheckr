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
    const { setSelectedTab, setContentsComponents } = useAppContext();
    const [isLoggedIn, setLoggedIn] = useState(true);

    const handleLogin = async () => {
        /**
         *  우선 로그인 기능(백엔드)이 개발되기 이전에는 API 호출 막고 버튼 클릭으로
         *  Todo-List 페이지로 이동할 수 있도록 함
         *
         *  로그인 기능 개발 시에는 주석 풀고 진행
         */
        // try {
        //     const response = await axios.post('http://localhost:8080/user/login', {
        //         id: id,
        //         password: password
        //     });
        //     console.log("Login Success");
        // }
        // catch (error) {
        //     console.log("Login Fail");
        // }

        // 임시 로그인 성공 처리
        setLoggedIn(!isLoggedIn);
        onLogin(id);
        if(isLoggedIn)
            navigate('/home');
    }

    const handleJoin = () => {
        setSelectedTab("Join");
        setContentsComponents((prevComponents) => [
            ...prevComponents,
            { tab: "Join", component: Join }
        ]);
        navigate('/home');
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