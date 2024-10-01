import axios from "../utils/axios";

export const loginUser = async (code: string) => {
    try {
        const response = await axios.post("/user/login", { code });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postGetRefreshToken = async (refresh_token: string) => {
    try {
        const response = (await axios.post("/user/refresh", { refresh_token }));
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await axios.post("/user/logout");
    } catch (error) {
        throw error;
    }
};
