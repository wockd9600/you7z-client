import axios from "./axios";

export const postCreateGameRoom = async () => {
    try {
        const response = await axios.post("/game/room/add");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const postEnterGameRoom = async (roomCode: string) => {
    try {
        const response = await axios.post("/game/room/enter", { roomCode });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getGameRoom = async (roomCode: string) => {
    try {
        const response = await axios.get(`/game/room/${roomCode}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
