import React from "react";
import { AppProvider } from "./Context/AppContext";
import './css/App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";

function App() {
  return (
      <BrowserRouter>
          <AppProvider>
              <div className="App">
                  <Routes>
                      <Route path="/" element={ <Home /> } />
                      <Route path="/login" element={ <Login /> } />
                  </Routes>
              </div>
          </AppProvider>
      </BrowserRouter>
  );
}

export default App;
