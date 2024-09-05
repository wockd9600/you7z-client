import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import YouTube, { YouTubeEvent } from "react-youtube";

import { GameUser, updateUserIsReady } from "../redux/gameSlice";
import { GameSong, setGameSong, setGameSongIndex } from "../redux/songSlice";

import SocketService from "../utils/socket";

import SettingsPanel from "./SettingsPanel";
import UserPanel from "./UserPanel";
import ScoreBoardModal from "components/Modals/ScoreBoardModal";
import Icon from "./Icon";
import Button from "./Common/Button";

import styles from "./css/GameBox.module.css";

import { GameStatus } from "constants/enums";

interface YouTubePlayer {
    playVideo: () => void;
    stopVideo: () => void;
    mute: () => void;
}

const GameBox = () => {
    const usersRef = useRef<GameUser[]>([]);
    const playerRef1 = useRef<YouTubePlayer | null>(null);
    const playerRef2 = useRef<YouTubePlayer | null>(null);

    const [isScoreBoardModalOpen, setScoreBoardModalOpen] = useState(false);
    const [isNextSongButton, setIsNextSongButton] = useState(false);
    const [isSpeakerIcon, setIsSpeakerIcon] = useState(false);

    const dispatch = useDispatch();

    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, status, users } = useSelector((state: RootState) => state.game);
    const { song1, song2, songIndex } = useSelector((state: RootState) => state.song);
    let gameFinish = true;

    useEffect(() => {
        usersRef.current = users;
    }, [users]);

    useEffect(() => {
        if (!roomCode) return;

        // const opts = {
        //     height: "300",
        //     width: "300",
        //     playerVars: {
        //         start: 15, // 시작 지점 설정
        //     },
        // };
        const socket = SocketService.getInstance(roomCode);

        socket.on("get song", handleGetSong);
        socket.on("ready song", handleReadySong);
        socket.on("all ready song", handleAllReadySong);
        socket.on("play song", handlePlaySong);

        return () => {
            socket.off("get song");
            socket.off("ready song");
            socket.off("all ready song");
            socket.off("play song");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    // const clickButton = () => {
    //     setScoreBoardModalOpen(true);
    // };

    const closeScoreBoardModal = () => setScoreBoardModalOpen(false);

    const _onReady = (event: YouTubeEvent, playerNumber: 0 | 1) => {
        console.log("---------on ready----------");
        if (playerNumber === 0) playerRef1.current = event.target;
        else playerRef2.current = event.target;
        // const user = usersRef.current.find((item) => item.userId === userId);
        // if (user?.userId === 5) return;

        const sessionGameStatusString = localStorage.getItem("GameStatus");
        if (sessionGameStatusString) {
            const sessionGameStatus = parseInt(sessionGameStatusString);
            setTimeout(() => {
                const user = usersRef.current.find((item) => item.userId === userId);

                console.log(sessionGameStatus === GameStatus.IS_GAMING, user?.isReady);
                if (sessionGameStatus === GameStatus.IS_GAMING && user && user.isReady) {
                    handlePlaySong();
                    return;
                }
            }, 100);
        }

        SocketService.socketEmit("ready song");

        let cnt = 0;
        let getSongInterval: NodeJS.Timeout;
        getSongInterval = setInterval(() => {
            cnt += 1;

            if (cnt > 30) {
                clearInterval(getSongInterval);
                alert("오류가 발생했습니다. 다시 로그인 해주세요.");
            }

            if (!usersRef.current) return clearInterval(getSongInterval);
            const user = usersRef.current.find((item) => item.userId === userId);

            if (user && user.isReady) clearInterval(getSongInterval);
            else SocketService.socketEmit("ready song");
        }, 1500);
    };

    const _onEnd = () => {
        console.log("Video has ended!");
        if (isNextSongButton && (playerRef1.current || playerRef2.current)) {
            playSong();
        }
    };

    const handleGetSong = (song: GameSong) => {
        if (!usersRef.current) return;

        const user = usersRef.current.find((user) => user.userId === userId);
        if (!song || !user || !user.isReady) dispatch(setGameSong(song));
    };

    const handleReadySong = (readyUserId: number) => {
        dispatch(updateUserIsReady({ userId: readyUserId, isReady: true }));
    };

    const handleAllReadySong = (authUserId: number) => {
        dispatch(updateUserIsReady({ userId, isReady: true }));
        if (userId !== authUserId) return;

        const sessionGameStatusString = localStorage.getItem("GameStatus");
        if (sessionGameStatusString) {
            const sessionGameStatus = parseInt(sessionGameStatusString);
            console.log(authUserId, userId);
            if (sessionGameStatus === GameStatus.IS_WAITING) {
                setIsNextSongButton(true);
            }
        }
    };

    const handlePlaySong = () => {
        localStorage.setItem("GameStatus", GameStatus.IS_GAMING.toString());

        setIsSpeakerIcon(true);
        console.log(playerRef1.current, songIndex);
        if (songIndex === 0) {
            if (playerRef1.current) {
                console.log("playing video")
            }
            setTimeout(() => {
                console.log("?");
                // playerRef1.current && playerRef1.current.mute();

                playerRef1.current && playerRef1.current.playVideo();
            }, 1000);
            playerRef2.current = null;
        } else {
            playerRef2.current && playerRef2.current.playVideo();
            playerRef1.current = null;
        }
        setGameSongIndex();
        setIsNextSongButton(false);
    };

    const playSong = () => SocketService.socketEmit("play song");

    return (
        <section>
            <article className={styles.container}>
                <UserPanel />
                {status === GameStatus.NOT_STARTED && <SettingsPanel />}{" "}
                {status === GameStatus.STARTED && (
                    <article className={`${styles.settingsPanelContainer} ${styles.musicContainer}`}>
                        <div className={styles.iconContainer}>
                            {isSpeakerIcon && (
                                <article>
                                    <Icon name="music" />
                                    <div className={styles.vibration}></div>
                                </article>
                            )}
                            {
                                <article>
                                    {song1.url && (
                                        <YouTube
                                            videoId={song1.url}
                                            opts={{
                                                playerVars: { start: song1.startTime },
                                            }}
                                            onReady={(event: YouTubeEvent) => _onReady(event, 0)}
                                            onEnd={_onEnd}
                                            style={{ display: "none" }}
                                        />
                                    )}
                                    {song2.url && (
                                        <YouTube
                                            videoId={song2.url}
                                            opts={{
                                                playerVars: { start: song2.startTime },
                                            }}
                                            onReady={(event: YouTubeEvent) => _onReady(event, 1)}
                                            style={{ display: "none" }}
                                        />
                                    )}
                                </article>
                            }
                        </div>
                        {isNextSongButton && <Button text="노래 스킵" onClick={playSong} style={{ width: "80%", height: "40px" }} />}
                    </article>
                )}
                {/* <Button text="노래모음 만들기" onClick={clickButton} style={{ marginBottom: "16px" }} /> */}
                {gameFinish && (
                    <article style={{ zIndex: 2 }}>
                        {" "}
                        <ScoreBoardModal isOpen={isScoreBoardModalOpen} onClose={closeScoreBoardModal} />
                    </article>
                )}
            </article>
        </section>
    );
};

export default GameBox;
