import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import Home from "pages/Home";
import Login from "pages/Login";
import Game from "pages/Game";

function App() {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    const isLogin = true;
    if (accessToken && refreshToken) {
    }

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={isLogin ? <Home /> : <Login />} />
                <Route path="/:room_code" element={<Game />} />
            </Routes>
        </div>
    );
}

export default App;
