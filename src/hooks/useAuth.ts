import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { login as loginRedux, logout as logoutRedux } from "../redux/userSlice";
import { loginUser, logoutUser } from "../services/authService";
import { handleLogin } from "utils/error";

export const useAuth = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const login = async (code: string) => {
        try {
            const userData = await loginUser(code);
            const { userId, access_token, refresh_token, nickname } = userData;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("nickname", nickname);
            localStorage.setItem("userId", userId);

            dispatch(loginRedux({ name: nickname, userId }));
            navigate("/");
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
            navigate("/");
        }
    };

    const logout = async () => {
        try {
            await logoutUser();
        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("nickname");
            dispatch(logoutRedux());
        }
    };

    return { login, logout };
};
