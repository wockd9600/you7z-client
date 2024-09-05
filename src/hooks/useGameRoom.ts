import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setGameState, setRoomCode } from "../redux/gameSlice";
import { setGameSong } from "../redux/songSlice";
import { getGameRoom } from "../services/gameRoomService";

export const useGameRoom = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getGameRoomInfo = async (roomCode: string) => {
        try {
            const data = await getGameRoom(roomCode);
            const { roomData, gameSongDto } = data;
            console.log(data)
            if (!data.success) {
                alert(data.message);
                navigate("/");
            }

            dispatch(setGameState(roomData));
            dispatch(setRoomCode(roomCode));
            if (gameSongDto) dispatch(setGameSong(gameSongDto));
        } catch (error) {
            if (error instanceof Error) console.log(error.message);
            console.log(error);
        }
    };

    return { getGameRoomInfo };
};
