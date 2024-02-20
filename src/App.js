import React from "react";
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

  return (
      <BrowserRouter>
          <AppProvider>
              <div className="App">
                  {/*<Login />*/}
                  <Routes>
                      <Route path="/" element={ <Login /> } />
                      <Route path="/home" element={ <Home /> } />
                  </Routes>
              </div>
          </AppProvider>
      </BrowserRouter>
  );
}

export default App;
