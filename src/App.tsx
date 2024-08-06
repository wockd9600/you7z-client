import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import Home from "pages/Home";
import Login from "pages/Login";

function App() {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    const isLogin = false;
    if (accessToken && refreshToken) {
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={isLogin ? <Home /> : <Login />} />
            </Routes>
        </div>
    );
}

export default App;
