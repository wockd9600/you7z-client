import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { postCreateGameRoom, postEnterGameRoom } from "../services/gameRoomService";
import { handleLogin } from "utils/error";

export const useJoinGameRoom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const createGameRoom = async () => {
        try {
            const roomData = await postCreateGameRoom();

            if (!roomData.success) {
                return alert(roomData.message);
            }

            navigate(`/${roomData.roomCode}`);
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
            console.log(error);
        }
    };

    const enterGameRoom = async (roomCode: string) => {
        try {
            localStorage.removeItem("roomCode");
            localStorage.removeItem("GameStatus");

            const roomData = await postEnterGameRoom(roomCode);

            if (!roomData.success) {
                return alert(roomData.message);
            }

            navigate(`/${roomCode}`);
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
            console.log(error);
        }
    };

    return { createGameRoom, enterGameRoom };
};
