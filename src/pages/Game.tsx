import { CSSProperties, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { logout as logoutRedux } from "../redux/userSlice";
import { setStatus, setManagerId, addAnswerMessage, addUser, GameAnswer, setDescription, setAnswers, GameUser, resetGameState, removeUser } from "../redux/gameSlice";

import { setGameSong } from "../redux/songSlice";

import SocketService from "../utils/socket";
import { refreshToken } from "../utils/auth";

import AnswerBox from "components/AnswerBox";
import GameBox from "components/GameBox";
import GameHeader from "components/GameHeader";
import AnswerInput from "components/AnswerInput";

import { useGameRoom } from "hooks/useGameRoom";
import { GameStatus } from "constants/enums";

interface YouTubePlayer {
    playVideo: () => void;
    stopVideo: () => void;
    mute: () => void;
    getPlayerState: () => number;
    videoTitle: string;
}

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

    const playerRef1 = useRef<YouTubePlayer | null>(null);
    const playerRef2 = useRef<YouTubePlayer | null>(null);
    const playerRef3 = useRef<YouTubePlayer | null>(null);
    const songIndexRef = useRef<Number>(0);

    const { userId } = useSelector((state: RootState) => state.user);
    const { songIndex } = useSelector((state: RootState) => state.song);

    useEffect(() => {
        songIndexRef.current = songIndex;
    }, [songIndex]);

    useEffect(() => {
        if (!roomCode) {
            navigate("/");
            return;
        }

        getGameRoomInfo(roomCode);

        const socket = SocketService.getInstance(roomCode);

        const sessionRoomCode = localStorage.getItem("roomCode");
        if (!sessionRoomCode) {
            SocketService.socketEmit("join user");
            localStorage.setItem("roomCode", roomCode);
        }

        const handleLeaveGame = (data: { leaveUserId: number; answer: GameAnswer; nextManagerId: number | null }) => {
            const { leaveUserId, answer, nextManagerId } = data;
            dispatch(addAnswerMessage(answer));
            dispatch(removeUser(leaveUserId));
            console.log(nextManagerId);
            if (nextManagerId) dispatch(setManagerId(nextManagerId));
        };

        const handleJoinUser = (user: GameUser) => {
            if (user.userId !== userId) {
                const answer = { id: 0, isAlert: true, userId: 0, message: `${user.nickname}님이 입장했습니다.` };
                dispatch(addUser({ ...user, isReady: true }));
                dispatch(addAnswerMessage(answer));
            } else {
                // const answer = { id: 0, isAlert: true, userId: 0, message: `방에 입장했습니다.` };
                // dispatch(addAnswerMessage(answer));
            }
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

                dispatch(setDescription(discription));
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

        const handleTokenExpried = async (params: any) => {
            const { event: name, ...data } = params;
            if (localStorage.getItem("refresh_token")) {
                await refreshToken();
                const access_token = localStorage.getItem("access_token");
                const refresh_token = localStorage.getItem("refresh_token");
                if (access_token && refresh_token && name) {
                    SocketService.socketEmit(name, data.data);
                } else {
                    dispatch(logoutRedux());
                    navigate("/");
                }
            }
        };

        socket.on("join user", handleJoinUser);
        socket.on("leave game", handleLeaveGame);
        socket.on("game start", handleGamerStart);
        socket.on("token expired", handleTokenExpried);

        SocketService.socketEmit("change user status");

        return () => {
            socket.off("join user");
            socket.off("leave game");
            socket.off("game start");
            socket.off("token expired");
            SocketService.clearInstance();
            dispatch(resetGameState());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleVisibilityChange = (type: "hidden" | "visible") => {
            const status = localStorage.getItem("GameStatus");
            if (!status || parseInt(status) === GameStatus.NOT_STARTED) return;
            // QXR44Y2Mg7I
            // console.log(document.visibilityState);
            const handleVideoPlayback = (pp: any, sp: any) => {
                pp && pp.playVideo();
                sp && sp.pauseVideo();
            };

            if (type === "hidden") {
                if (songIndexRef.current === 0) {
                    if (!playerRef2.current) return;
                    handleVideoPlayback(playerRef3.current, playerRef2.current);
                } else {
                    if (!playerRef1.current) return;
                    handleVideoPlayback(playerRef3.current, playerRef1.current);
                }
            } else if (type === "visible") {
                if (songIndexRef.current === 0) {
                    if (!playerRef2.current) return;
                    handleVideoPlayback(playerRef2.current, playerRef3.current);
                } else {
                    if (!playerRef1.current) return;
                    handleVideoPlayback(playerRef1.current, playerRef3.current);
                }
            }
        };

        // 페이지 가시성 변화 이벤트 감지
        // window.addEventListener("visibilitychange", handleVisibilityChange);
        // window.addEventListener("blur", handleVisibilityChange);

        window.addEventListener("blur", () => handleVisibilityChange("hidden"));
        window.addEventListener("focus", () => handleVisibilityChange("visible"));
        return () => {
            // 컴포넌트 언마운트 시 이벤트 리스너 제거
        };
    }, []);

    return (
        <section style={gameContainer}>
            <GameHeader />
            <GameBox playerRef1={playerRef1} playerRef2={playerRef2} playerRef3={playerRef3} />
            <AnswerBox />
            <AnswerInput />
        </section>
    );
};

export default Game;
