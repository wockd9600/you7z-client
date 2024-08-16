import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "./redux/store";
import { login } from "./redux/userSlice";

import { Route, Routes } from "react-router-dom";
import "./assets/styles/App.css";
import Home from "pages/Home";
import Login from "pages/Login";
import Game from "pages/Game";

function App() {
    const dispatch = useDispatch();

    const isLogin = useSelector((state: RootState) => state.user.isLogin);

    useEffect(() => {
        // Fetch tokens from localStorage
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");

        if (accessToken && refreshToken) {
            const name = localStorage.getItem("nickname");
            if (name) dispatch(login({ name }));
        }
    }, [dispatch]);

    let lastTouchEnd = 0;

    document.documentElement.addEventListener(
        "touchstart",
        (event) => {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        },
        false
    );

    document.documentElement.addEventListener(
        "touchend",
        (event) => {
            const now = new Date().getTime();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        },
        false
    );

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
