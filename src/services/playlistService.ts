import axios from "./axios";

export const getPopularPlaylists = async (page: number) => {
    try {
        const response = await axios.get("/playlist/popular", { params: { page } });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "알 수 없는 오류입니다.");
        } else {
            throw new Error("알 수 없는 오류입니다.");
        }
    }
};

export const postStorePlaylist = async (id: number) => {
    try {
        await axios.post("/playlist/store", { id });
    } catch (error) {
        throw new Error("알 수 없는 오류입니다.");
    }
};
