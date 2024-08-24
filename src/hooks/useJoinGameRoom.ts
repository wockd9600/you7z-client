import { useNavigate } from "react-router-dom";

import { postCreateGameRoom, postEnterGameRoom } from "../services/gameRoomService";

export const useJoinGameRoom = () => {
    const navigate = useNavigate();

    const createGameRoom = async () => {
        try {
            const roomData = await postCreateGameRoom();

            if (!roomData.success) {
                return alert(roomData.message);
            }

            navigate(`/${roomData.roomCode}`);
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            console.log(error);
        }
    };

    const enterGameRoom = async (roomCode: string) => {
        try {
            const roomData = await postEnterGameRoom(roomCode);

            if (!roomData.success) {
                return alert(roomData.message);
            }

            navigate(`/${roomCode}`);
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            console.log(error);
        }
    };

    return { createGameRoom, enterGameRoom };
};
