import { postGetRefreshToken } from "../services/authService";

export const refreshToken = async () => {
    const refresh_token = localStorage.getItem("refresh_token");
    if (!refresh_token) return false;

    try {
        const tokenData = await postGetRefreshToken(refresh_token);
        const { access_token } = tokenData;

        localStorage.setItem("access_token", access_token);
        return true;
    } catch (error) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("access_token");
        console.log(error);
        return false;
        // console.log(error);
        // reLogin();
    }
};

// export const reLogin = async () => {
//     localStorage.removeItem("access_token");
//     localStorage.removeItem("refresh_token");
//     localStorage.removeItem("nickname");
// };
