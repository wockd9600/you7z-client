import { useDispatch } from "react-redux";
import { login as loginRedux, logout as logoutRedux } from "../redux/userSlice";
import { loginUser, logoutUser } from "../services/authService";

export const useAuth = () => {
    const dispatch = useDispatch();

    const login = async (code: string) => {
        try {
            const userData = await loginUser(code);
            const { access_token, refresh_token, nickname } = userData;

            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            localStorage.setItem("nickname", nickname);

            dispatch(loginRedux({ name: nickname }));
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            localStorage.removeItem("nickname");

            dispatch(logoutRedux());
            await logoutUser();
        } catch (error) {
            console.log(error);
        }
    };

    return { login, logout };
};
