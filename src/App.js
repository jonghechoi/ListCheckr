import React, {useState} from "react";
import { AppProvider } from "./Context/AppContext";
import { BoardProvider } from "./Context/BoardContext";
import './css/App.css';
import {Routes, Route, BrowserRouter, Navigate} from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Contents from "./Components/TabComponent/Contents/Contents";

function App() {
    const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);

    const handleLogin = (id, userInfo) => {
        setLoggedInUserInfo({ id: id, userInfo: userInfo});
    }

    return (
      <BrowserRouter>
          <AppProvider>
              <BoardProvider>
                  <div className="App">
                      <Routes>
                          <Route path="/" element={ <Login onLogin={handleLogin} /> } />
                          <Route path="/home" element={ loggedInUserInfo ? <Home loggedInUserInfo={loggedInUserInfo} /> : <Navigate to="/" /> } />
                          <Route path="/contents" element={ loggedInUserInfo ? <Contents loggedInUserInfo={loggedInUserInfo} /> : <Navigate to="/" /> } />
                      </Routes>
                  </div>
              </BoardProvider>
          </AppProvider>
      </BrowserRouter>
    );
}

export default App;
