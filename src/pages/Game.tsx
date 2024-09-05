import { CSSProperties, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { setStatus, addAnswerMessage, addUser, GameAnswer, setAnswers, GameUser, resetGameState, removeUser } from "../redux/gameSlice";
import { setGameSong } from "../redux/songSlice";

import SocketService from "../utils/socket";

import AnswerBox from "components/AnswerBox";
import GameBox from "components/GameBox";
import GameHeader from "components/GameHeader";
import AnswerInput from "components/AnswerInput";

import { useGameRoom } from "hooks/useGameRoom";
import { GameStatus } from "constants/enums";

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

    const { userId } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        if (!roomCode) {
            navigate("/");
            return;
        }

        getGameRoomInfo(roomCode);

        const socket = SocketService.getInstance(roomCode);

        const sessionRoomCode = sessionStorage.getItem("roomCode");
        if (!sessionRoomCode) {
            SocketService.socketEmit("join user");
            sessionStorage.setItem("roomCode", roomCode);
        }

        const handleLeaveGame = (data: { leaveUserId: number; answer: GameAnswer }) => {
            const { leaveUserId, answer } = data;
            dispatch(addAnswerMessage(answer));
            dispatch(removeUser(leaveUserId));
        };

        const handleJoinUser = (user: GameUser) => {
            if (user.userId === userId) return;

            const answer = { id: 0, isAlert: true, userId: 0, message: `${user.nickname}님이 입장했습니다.` };
            dispatch(addUser(user));
            dispatch(addAnswerMessage(answer));
        };

        const handleGamerStart = (data: any) => {
            const { gmaeSongData, gmaePlaylistData } = data;

            localStorage.setItem("GameStatus", GameStatus.STARTED.toString());

            if (gmaeSongData) dispatch(setGameSong(gmaeSongData));
            if (gmaePlaylistData) {
                const { title, discription } = gmaePlaylistData;
                const answer = [
                    { id: 0, isAlert: true, userId: 0, message: `게임 시작!!!` },
                    { id: 0, isAlert: true, userId: 0, message: `${title}` },
                    { id: 0, isAlert: true, userId: 0, message: `${discription || ""}` },
                ];
                dispatch(setAnswers(answer));
                dispatch(setStatus(1));

                setTimeout(() => {
                    let count = 3;
                    const countInterval = setInterval(() => {
                        const countAnswer = { id: 0, isAlert: true, userId: 0, message: `${count}` };
                        dispatch(addAnswerMessage(countAnswer));
                        count -= 1;

                        if (count <= 0) {
                            clearInterval(countInterval);
                        }
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
            localStorage.removeItem("GameStatus");
            SocketService.clearInstance();
            dispatch(resetGameState());
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
