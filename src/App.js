import React, {useState} from "react";
import { AppProvider } from "./Context/AppContext";
import { BoardProvider } from "./Context/BoardContext";
import './css/App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";
import Contents from "./Components/TabComponent/Contents/Contents";

function App() {
    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const handleLogin = (userId) => {
        setLoggedInUserId(userId);
    }

    return (
      <BrowserRouter>
          <AppProvider>
              <BoardProvider>
                  <div className="App">
                      <Routes>
                          <Route path="/" element={ <Login onLogin={handleLogin} /> } />
                          <Route path="/home" element={ <Home loggedInUserId={loggedInUserId} /> } />
                          <Route path="/contents" element={ <Contents /> } />
                      </Routes>
                  </div>
              </BoardProvider>
          </AppProvider>
      </BrowserRouter>
    );
}

export default App;
