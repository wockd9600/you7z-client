import axios from "../utils/axios";

export const getPopularPlaylists = async (page: number, type: number, search_term?: string) => {
    try {
        const response = await axios.get("/playlist", { params: { page, type, search_term } });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data?.message || "알 수 없는 오류입니다.");
        } else {
            throw new Error("알 수 없는 오류입니다.");
        }
    }
};
