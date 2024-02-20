import React, {useState} from "react";
import { AppProvider } from "./Context/AppContext";
import './css/App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home";


function App() {

    // const [data, setData] = useState(null);
    //
    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response = await axios.get('http://localhost:3001/api/data');
    //             setData(response.data);
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };
    //
    //     fetchData();
    // }, []);

    const [loggedInUserId, setLoggedInUserId] = useState(null);

    const handleLogin = (userId) => {
        setLoggedInUserId(userId);
    }

    return (
      <BrowserRouter>
          <AppProvider>
              <div className="App">
                  {/*<Login />*/}
                  <Routes>
                      {/*<Route path="/" element={ <Login /> } />*/}
                      {/*<Route path="/home" element={ <Home /> } />*/}
                      <Route path="/" element={ <Login onLogin={handleLogin} /> } />
                      <Route path="/home" element={ <Home loggedInUserId={loggedInUserId} /> } />
                  </Routes>
              </div>
          </AppProvider>
      </BrowserRouter>
    );
}

export default App;
