import { useDispatch } from "react-redux";

import { setGameState, setRoomCode } from "../redux/gameSlice";
import { getGameRoom } from "../services/gameRoomService";

export const useGameRoom = () => {
    const dispatch = useDispatch();

    const getGameRoomInfo = async (roomCode: string) => {
        try {
            const data = await getGameRoom(roomCode);

            if (!data.success) {
                return alert(data.message);
            }

            sessionStorage.setItem("roomCode", data.roomData.roomCode);
            dispatch(setGameState(data.roomData));
            dispatch(setRoomCode(roomCode));
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            console.log(error);
        }
    };

    return { getGameRoomInfo };
};
