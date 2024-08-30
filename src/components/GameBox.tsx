import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { setGameSongIndex, updateUserIsReady } from "../redux/gameSlice";

import YouTube, { YouTubeEvent } from "react-youtube";

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
}

const GameBox = () => {
    const playerRef1 = useRef<YouTubePlayer | null>(null);
    const playerRef2 = useRef<YouTubePlayer | null>(null);

    const [isScoreBoardModalOpen, setScoreBoardModalOpen] = useState(false);
    const [isNextSongButton, setIsNextSongButton] = useState(false);

    const dispatch = useDispatch();

    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, status, users, songs, songIndex } = useSelector((state: RootState) => state.game);
    let gameFinish = true;

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

        // const handleGetSong = (song: GameSong) => {
        //     const user = users.find((user) => user.userId === userId);
        //     if (!song || !user || !user.isReady) dispatch(setGameSong(song));
        // };
        const handleReadySong = (readyUserId: number) => dispatch(updateUserIsReady({ userId: readyUserId, isReady: true }));
        const handleAllReadySong = (authUserId: number) => authUserId === userId && setIsNextSongButton(true);
        const handlePlaySong = () => {
            if (songIndex === 0) {
                playerRef1.current && playerRef1.current.playVideo();
                playerRef2.current = null;
            } else {
                playerRef2.current && playerRef2.current.playVideo();
                playerRef1.current = null;
            }
            setGameSongIndex();
            setIsNextSongButton(false);
        };

        // socket.on("get song", handleGetSong);
        socket.on("ready song", handleReadySong);
        socket.on("all ready song", handleAllReadySong);
        socket.on("play song", handlePlaySong);

        return () => {
            // socket.off("get song");
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
        console.log("on ready");
        if (playerNumber === 0) playerRef1.current = event.target;
        else playerRef2.current = event.target;

        SocketService.socketEmit("ready song");

        const getSongInterval = setInterval(() => {
            const user = users.find((item) => item.userId === userId);
            if (!user || user.isReady) clearInterval(getSongInterval);

            SocketService.socketEmit("ready song");
        }, 1000);
    };

    const _onEnd = () => {
        console.log("Video has ended!");
        if (isNextSongButton && (playerRef1.current || playerRef2.current)) {
            playSong();
        }
    };

    const playSong = () => SocketService.socketEmit("play song");

    return (
        <section>
            <article className={styles.container}>
                <UserPanel />

                {status === GameStatus.NOT_STARTED ? (
                    <SettingsPanel />
                ) : (
                    <article className={`${styles.settingsPanelContainer} ${styles.musicContainer}`}>
                        <div className={styles.iconContainer}>
                            <Icon name="music" />
                            <div className={styles.vibration}></div>
                            {songs && (
                                <article>
                                    <YouTube
                                        videoId={songs[0].url}
                                        opts={{
                                            playerVars: { start: songs[0].startTime },
                                        }}
                                        onReady={(event: YouTubeEvent) => _onReady(event, 0)}
                                        onEnd={_onEnd}
                                        style={{ display: "none" }}
                                    />
                                    <YouTube
                                        videoId={songs[1].url}
                                        opts={{
                                            playerVars: { start: songs[1].startTime },
                                        }}
                                        onReady={(event: YouTubeEvent) => _onReady(event, 1)}
                                        style={{ display: "none" }}
                                    />
                                </article>
                            )}
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
