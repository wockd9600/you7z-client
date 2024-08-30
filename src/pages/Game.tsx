import { CSSProperties, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addAnswerMessage, addUser, setGameSongs, GameAnswer, setAnswers, GameUser, removeUser } from "../redux/gameSlice";

import SocketService from "../utils/socket";

import AnswerBox from "components/AnswerBox";
import GameBox from "components/GameBox";
import GameHeader from "components/GameHeader";
import AnswerInput from "components/AnswerInput";

import { useGameRoom } from "hooks/useGameRoom";

const Game = () => {
    const gameContainer: CSSProperties = {
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    };

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { roomCode } = useParams();
    const { getGameRoomInfo } = useGameRoom();

    // 서버에서 방 정보를 가져온 뒤
    // redux에 넣는다.

    useEffect(() => {
        if (!roomCode) {
            navigate("/");
            return;
        }

        const sessionRoomCode = sessionStorage.getItem("roomCode");
        if (!sessionRoomCode) SocketService.socketEmit("join user");

        getGameRoomInfo(roomCode);

        const socket = SocketService.getInstance(roomCode);

        const handleLeaveGame = (data: { leaveUserId: number; answer: GameAnswer }) => {
            const { leaveUserId, answer } = data;
            dispatch(addAnswerMessage(answer));
            dispatch(removeUser(leaveUserId));
        };

        const handleJoinUser = (user: GameUser) => {
            dispatch(addUser(user));
        };

        const handleGamerStart = (data: any) => {
            const { gmaeSongData, gmaePlaylistData } = data;
            if (gmaeSongData) dispatch(setGameSongs(gmaeSongData));
            if (gmaePlaylistData) {
                const { title, discription } = gmaePlaylistData;
                const answer = [
                    { id: 0, isAlert: true, userId: 0, message: `${title}` },
                    { id: 0, isAlert: true, userId: 0, message: `${discription}` },
                ];
                dispatch(setAnswers(answer));

                setTimeout(() => {
                    let count = 3;
                    const countInterval = setInterval(() => {
                        const countAnswer = { id: 0, isAlert: true, userId: 0, message: `${count}` };
                        dispatch(addAnswerMessage(countAnswer));
                        count -= 1;

                        if (count <= 1) clearInterval(countInterval);
                    }, 1000);
                }, 2000);
            }
        };

        socket.on("join user", handleJoinUser);
        socket.on("leave game", handleLeaveGame);
        socket.on("game start", handleGamerStart);
        return () => {
            socket.off("join user");
            socket.off("leave game");
            socket.off("game start");
            sessionStorage.removeItem("roomCode");
            SocketService.clearInstance();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <section style={gameContainer}>
            <GameHeader />
            <GameBox />
            <AnswerBox />
            <AnswerInput />
        </section>
    );
};

export default Game;
