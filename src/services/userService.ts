import axios from "../utils/axios";

export const patchName = async (name: string) => {
    try {
        await axios.patch("/user/name", { nickname: name });
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Attach additional details if needed
            throw new Error(error.response?.data?.message || "알 수 없는 오류입니다.");
        } else {
            throw new Error("알 수 없는 오류입니다.");
        }
    }
};
