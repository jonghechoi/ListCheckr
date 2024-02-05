import React, { useState } from "react";
import axios from "axios";

import '../../css/Join.css';
import {useAppContext} from "../../Context/AppContext";

const Join = () => {
    const { setSelectedTab } = useAppContext();

    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [birth, setBirth] = useState("");
    const [gender, setGender] = useState(0);
    const [genderBackColors, setGenderBackColors] = useState({
        male: "white",
        female: "white",
        other: "white",
    });
    const [genderFontColors, setGenderFontColors] = useState({
        male: "black",
        female: "black",
        other: "black",
    });
    const [selectedCountry, setSelectedCountry] = useState("kr");
    const [phone, setPhone] = useState("");

    const [error, setError] = useState({
        id: false,
        password: false,
        name: false,
        birth: false,
        phone: false
    });
    const handleId = () => {
        if(id !== '') setError((prevState) => ({ ...error, id: false}));
    }
    const handlePassword = () => {
        if(password !== '') setError((prevState) => ({ ...error, password: false}));
    }
    const handleName = () => {
        if(name !== '') setError((prevState) => ({ ...error, name: false}));
    }
    const handleBirth = () => {
        if(birth !== '') setError((prevState) => ({ ...error, birth: false}));
    }
    const handlePhone = () => {
        if(phone !== '') setError((prevState) => ({ ...error, phone: false}));
    }

    const handleGenderRadioBtn = (e) => { setGender(e.target.value); }

    const handleGenderClick = (gender) => {
        const updateBackColors = {
            male: "white",
            female: "white",
            other: "white",
        }
        updateBackColors[gender] = "#053742"
        setGenderBackColors(updateBackColors);

        const updateFontColors = {
            male: "black",
            female: "black",
            other: "black",
        }
        updateFontColors[gender] = "white"
        setGenderFontColors(updateFontColors);
    }

    const handleJoin = async () => {
        // validation check
        const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
        if(id === '') setError((prevState) => ({ ...error, id: true }));
        if(password === '') setError((prevState) => ({ ...error, password: true }));
        if(name === '') setError((prevState) => ({ ...error, name: true }));
        if(birth === '' || birth.length !== 8) setError((prevState) => ({ ...error, birth: true }));
        if(phone === '' || !phoneRegex.test(phone)) setError((prevState) => ({ ...error, phone: true }));

        // API request
        try {
            const response = await axios.post('http://localhost:8081/user/join', {
                id: id,
                password: password,
                email: email,
                name: name,
                birth: birth.toString(),
                gender: gender,
                country: selectedCountry,
                phone: phone
            });
            // 회원가입 정상 처리시 로그인 페이지 이동
            alert("회원가입 성공");
            setSelectedTab("Login");
        }
        catch (error) {
            console.error(error.response.status);
            console.error(error.response.data[0].message);
        }
    }

    return (
        <div>
            <form method="post" id="form">
                {/*<%--<input type="hidden" name="command" value="join">--%>*/}
                <div className="group">
                    <input
                        type="text"
                        id="id"
                        name="id"
                        placeholder="아이디"
                        style={ error.id ? { borderColor: 'red' } : { borderColor: 'green' } }
                        onChange={ (e) =>  {
                            setId(e.target.value);
                            handleId() } } />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="비밀번호"
                        style={ error.password ? { borderColor: 'red' } : { borderColor: 'green' } }
                        onChange={ (e) => {
                            setPassword(e.target.value);
                            handlePassword() }} />
                    <input
                        type="text"
                        id="email"
                        name="email"
                        placeholder="[선택] 비밀번호 분실 시 확인용 이메일"
                        onChange={ (e) => setEmail(e.target.value) } />
                </div>
                <div className="error-msg">
                    <ul>
                        <li id="error-id" style={error.id ? { display: 'block' } : { display: 'none'} }>아이디는 필수 입력값입니다.</li>
                        <li id="error-password" style={error.password ? { display: 'block' } : { display: 'none'} }>비밀번호는 필수 입력값입니다.</li>
                    </ul>
                </div>

                <div className="group">
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="이름"
                        style={ error.name ? { borderColor: 'red' } : { borderColor: 'green' } }
                        onChange={(e) => {
                            setName(e.target.value);
                            handleName() } } />
                    <input
                        type="text"
                        id="birth"
                        name="birth"
                        placeholder="생년월일 8자리"
                        style={ error.birth ? { borderColor: 'red' } : { borderColor: 'green' } }
                        onChange={(e) => {
                            setBirth(e.target.value);
                            handleBirth() } } />

                    <input onChange={ handleGenderRadioBtn } type="radio" id="male" name="gender" value="1" checked={gender === "1"} />
                    <input onChange={ handleGenderRadioBtn } type="radio" id="female" name="gender" value="2" checked={gender === "2"} />
                    <input onChange={ handleGenderRadioBtn } type="radio" id="other" name="gender" value="3" checked={gender === "3"} />

                    <div id="gender">
                        <label htmlFor="male">
                            <div
                                id="for-male"
                                className="gender"
                                style={{ backgroundColor: genderBackColors.male, color: genderFontColors.male }}
                                onClick={() => handleGenderClick("male")}
                            >Male</div>
                        </label>
                        <label htmlFor="female">
                            <div
                                id="for-female"
                                className="gender"
                                style={{ backgroundColor: genderBackColors.female, color: genderFontColors.female }}
                                onClick={() => handleGenderClick("female")}
                            >Female</div>
                        </label>
                        <label htmlFor="other">
                            <div
                                id="for-other"
                                className="gender"
                                style={{ backgroundColor: genderBackColors.other, color: genderFontColors.other }}
                                onClick={() => handleGenderClick("other")}
                            >Other</div>
                        </label>
                    </div>

                    <div id="country">
                        <select name="country" defaultValue={"kr"} value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                            <option value="id">Index</option>
                            <option value="kr">Korea +82</option>
                            <option value="jp">Japan +81</option>
                            <option value="us">US +1</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="전화번호 ###-####-####"
                        style={ error.phone ? { borderColor: 'red' } : { borderColor: 'green' } }
                        onChange={(e) => {
                            setPhone(e.target.value)
                            handlePhone() } } />
                </div>

                <div className="error-msg">
                    <ul>
                        <li id="error-name" style={ error.name ? { display: 'block' } : { display: 'none' }}>이름은 필수 입력값입니다.</li>
                        <li id="error-birth" style={ error.birth ? { display: 'block' } : { display: 'none' }}>생년월일은 필수 입력값입니다.</li>
                        <li id="error-phone" style={ error.phone ? { display: 'block' } : { display: 'none' }}>전화번호는 필수 입력값입니다. (양식 : ###-####-####)</li>
                    </ul>
                </div>

                <input type="button" id="btn_join" value="join" onClick={ handleJoin } />  {/*submit가 발생 전에 js로 이동한 후 유효성 검사를 먼저 통과해야 함*/}
                {/*<button>가입</button> form 안에 있는 일반 버튼 태그는 default로 submit 응답을 하게 됨/ 이게 input태그 안에 button 타입이 존재하는 이유임(중간에 이벤트를 주기 위해)*/}
            </form>
        </div>
    );
};

export default Join;