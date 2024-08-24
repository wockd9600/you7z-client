import { useDispatch } from "react-redux";

import { setGameState } from "../redux/gameSlice";
import { getGameRoom } from "../services/gameRoomService";

export const useGameRoom = () => {
    const dispatch = useDispatch();

    const getGameRoomInfo = async (roomCode: string) => {
        try {
            const data = await getGameRoom(roomCode);
            console.log(data);
            if (!data.success) {
                return alert(data.message);
            }
            dispatch(setGameState(data.roomData));
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            console.log(error);
        }
    };

    return { getGameRoomInfo };
};
