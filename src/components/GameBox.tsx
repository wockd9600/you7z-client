import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import YouTube, { YouTubeEvent } from "react-youtube";

import { setStatus, GameUser, updateUserInfo, setAnswers, setManagerId, removeUser } from "../redux/gameSlice";
import { GameSong, setGameSong, setGameSongIndex } from "../redux/songSlice";

import SocketService from "../utils/socket";

import SettingsPanel from "./SettingsPanel";
import UserPanel from "./UserPanel";
import ScoreBoardModal from "components/Modals/ScoreBoardModal";
import Icon from "./Icon";
import Button from "./Common/Button";

import styles from "./css/GameBox.module.css";

import { GameStatus } from "constants/enums";
import Timer from "./Timer";

interface GameBoxProps {
    inputRef: MutableRefObject<HTMLInputElement | null>;
    playerRef1: MutableRefObject<YouTubePlayer | null>;
    playerRef2: MutableRefObject<YouTubePlayer | null>;
    playerRef3: MutableRefObject<YouTubePlayer | null>;
}

interface YouTubePlayer {
    playVideo: () => void;
    stopVideo: () => void;
    mute: () => void;
    getPlayerState: () => number;
}

const GameBox = ({ inputRef, playerRef1, playerRef2, playerRef3 }: GameBoxProps) => {
    const usersRef = useRef<GameUser[]>([]);
    const songIndexRef = useRef<Number>(0);
    // const playerRef1 = useRef<YouTubePlayer | null>(null);
    // const playerRef2 = useRef<YouTubePlayer | null>(null);
    // const playerRef3 = useRef<YouTubePlayer | null>(null);

    const [isMobile, setIsMobile] = useState(false);

    const [isScoreBoardModalOpen, setScoreBoardModalOpen] = useState(false);
    const [newUsers, setNewUsers] = useState<{ user_id: number }[]>([]);

    const [isPassSongButton, setIsPassSongButton] = useState(false);
    const [isPlaySongButton, setIsPlaySongButton] = useState(false);
    const [isNextSongButton, setIsNextSongButton] = useState(false);
    const [isNextSongButtonDisable, setIsNextSongButtonDisable] = useState(false);
    const [isSpeakerIcon, setIsSpeakerIcon] = useState(false);
    const [isTimer, setIsTimer] = useState(false);

    const dispatch = useDispatch();

    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, status, users } = useSelector((state: RootState) => state.game);
    const { song1, song2, songIndex } = useSelector((state: RootState) => state.song);

    useEffect(() => {
        const checkDevice = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const mobileDevices = /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/;
            setIsMobile(mobileDevices.test(userAgent));
        };

        checkDevice(); // 초기 렌더링 시 체크

        // 윈도우 크기 변경 시에도 모바일인지 체크
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // 너비 기준으로 모바일/데스크탑 판단
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        usersRef.current = users;
    }, [users]);

    useEffect(() => {
        songIndexRef.current = songIndex;
    }, [songIndex]);

    const _onReadyTemp = (event: YouTubeEvent) => {
        playerRef3.current = event.target;
    };

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

        socket.on("pass song", handlePassSong);
        socket.on("all pass song", handleAllPassSong);
        socket.on("next song", handleNextSong);
        socket.on("ready song", handleReadySong);
        socket.on("all ready song", handleAllReadySong);
        socket.on("play song", handlePlaySong);
        socket.on("game finish", handleGameFinish);

        return () => {
            socket.off("pass song");
            socket.off("next song");
            socket.off("ready song");
            socket.off("all ready song");
            socket.off("play song");
            socket.off("game finish");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    function isDesktop(): boolean {
        const userAgent = navigator.userAgent.toLowerCase();
        // 모바일 기기에 해당하는 문자열이 포함되어 있는지 확인
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
        return !isMobile; // 모바일이 아니면 데스크톱으로 판단
    }

    const closeScoreBoardModal = () => {
        if (Array.isArray(newUsers)) {
            const users = usersRef.current;
            users.forEach((user) => {
                if (!newUsers.some((newUser) => newUser.user_id === user.userId)) {
                    dispatch(removeUser(user.userId));
                } else {
                    dispatch(updateUserInfo({ userId: user.userId, score: 0 }));
                }
            });
        }

        setScoreBoardModalOpen(false);
        dispatch(setAnswers([]));
        setTimeout(() => setNewUsers([]), 100);
    };

    const _onReady = (event: YouTubeEvent, playerNumber: 0 | 1) => {
        if (playerNumber === 0) {
            if (!song1.url) return;
            playerRef1.current = event.target;
            event.target.seekTo(song1.startTime, true);
        } else {
            if (!song2.url) return;
            playerRef2.current = event.target;
            event.target.seekTo(song2.startTime, true);
        }
        event.target.pauseVideo();

        const iframes = document.getElementsByTagName("iframe");

        // 각 iframe의 title 속성을 변경
        for (let i = 0; i < iframes.length; i++) {
            iframes[i].title = "무제";
        }

        // const user = usersRef.current.find((item) => item.userId === userId);
        // if (user?.userId === 5) return;

        // 이미 게임이 시작된 상황이라면
        const sessionGameStatusString = localStorage.getItem("GameStatus");
        if (sessionGameStatusString) {
            const sessionGameStatus = parseInt(sessionGameStatusString);
            if (sessionGameStatus === GameStatus.IS_GAMING) {
                if (isDesktop()) {
                    handlePlaySong();
                } else {
                    setIsPlaySongButton(true);
                }
                return;
            }
        }
        SocketService.socketEmit("ready song");
    };

    const _onEnd = () => {
        if (isNextSongButton && (playerRef1.current || playerRef2.current)) {
            playSong();
        }
    };

    const handlePassSong = (passUserId: number) => {
        if (userId === passUserId) {
            setIsNextSongButtonDisable(true);
        }
        dispatch(updateUserInfo({ userId: passUserId, status: 1 }));
    };

    const handleAllPassSong = () => {
        setIsPassSongButton(false);
    };

    const handleNextSong = (song: GameSong, notAgreeUserId?: number[]) => {
        if (notAgreeUserId && Array.isArray(notAgreeUserId)) {
            notAgreeUserId.forEach((readyUserId) => {
                dispatch(updateUserInfo({ userId: readyUserId, isReady: false }));
            });

            if (!notAgreeUserId.includes(userId)) return;
        }

        setIsPassSongButton(false);
        dispatch(setGameSong(song));
    };

    const handleReadySong = (readyUserId: number) => {
        setIsPassSongButton(false);
        dispatch(updateUserInfo({ userId: readyUserId, isReady: true }));
    };

    const handleAllReadySong = (authUserId: number) => {
        dispatch(updateUserInfo({ userId, isReady: true }));
        if (userId !== authUserId) return;
        const sessionGameStatusString = localStorage.getItem("GameStatus");

        if (sessionGameStatusString) {
            const sessionGameStatus = parseInt(sessionGameStatusString);
            if (sessionGameStatus === GameStatus.IS_WAITING) {
                setIsNextSongButton(true);
            }
        }
    };

    const handleGameFinish = (finishResponseData: any) => {
        const { newUsers, managerId } = finishResponseData;
        localStorage.setItem("GameStatus", GameStatus.NOT_STARTED.toString());
        setTimeout(() => {
            if (managerId) dispatch(setManagerId(managerId));
            if (newUsers) setNewUsers(newUsers);
            setScoreBoardModalOpen(true);
            dispatch(setStatus(0));
            setIsTimer(false);
            playerRef1.current = null;
            playerRef2.current = null;
        }, 5000);
    };

    const handlePlaySong = (possibleAudioPlayer = true) => {
        localStorage.setItem("GameStatus", GameStatus.IS_GAMING.toString());
        // focusInput();

        setIsNextSongButton(false);
        setIsTimer(false);
        setTimeout(() => setIsTimer(true), 100);
        setIsSpeakerIcon(true);

        // 모바일은 자동재생이 안된다.
        // 자동재생이고(클릭x) 모바일이면 => 재생 버튼을 생성한다.
        if (possibleAudioPlayer && !isDesktop()) {
            if (playerRef2.current) playerRef2.current.stopVideo();
            if (playerRef1.current) playerRef1.current.stopVideo();
            setIsPlaySongButton(true);
            return;
        }

        if (songIndexRef.current === 0) {
            if (playerRef2.current) playerRef2.current.stopVideo();
            if (playerRef1.current) {
                playerRef1.current.playVideo();
                let cnt1 = 0;
                const interval = setInterval(() => {
                    cnt1++;
                    if (cnt1 > 50) clearInterval(interval);
                    if (playerRef1.current && typeof playerRef1.current.playVideo === "function") {
                        const status = playerRef1.current.getPlayerState();
                        playerRef1.current.playVideo();
                        if (status !== 1) {
                            if (status !== 3) setIsPlaySongButton(true);
                            return;
                        }
                    }
                    setIsPlaySongButton(false);
                    clearInterval(interval);
                }, 200);
            }
            // playerRef2.current = null;
        } else {
            if (playerRef1.current) playerRef1.current.stopVideo();
            if (playerRef2.current) {
                playerRef2.current.playVideo();
                let cnt2 = 0;
                const interval = setInterval(() => {
                    cnt2++;
                    if (cnt2 > 50) clearInterval(interval);
                    if (playerRef2.current && typeof playerRef2.current.playVideo === "function") {
                        const status = playerRef2.current.getPlayerState();
                        playerRef2.current.playVideo();
                        if (status !== 1) {
                            if (status !== 3) setIsPlaySongButton(true);
                            return;
                        }
                    }
                    setIsPlaySongButton(false);
                    clearInterval(interval);
                }, 200);
            }
            // playerRef2.current = null;
        }

        setTimeout(() => {
            dispatch(setGameSongIndex());
        }, 100);

        usersRef.current.forEach((user) => {
            if (user.status !== -1) {
                dispatch(updateUserInfo({ userId: user.userId, status: 0 }));
            }
        });

        dispatch(setAnswers([]));

        setIsPassSongButton(true);
        setIsNextSongButtonDisable(false);
    };

    const focusInput = () => {
        if (inputRef && inputRef.current) inputRef.current.focus();
    };

    const playSong = () => {
        focusInput();
        SocketService.socketEmit("play song");
    };
    const passSong = () => {
        focusInput();
        SocketService.socketEmit("pass song");
    };

    return (
        <section>
            <article className={styles.container}>
                <UserPanel />
                {isTimer && <Timer isMobile={isMobile || false} />}
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
                                <article style={{ marginTop: "100px" }}>
                                    <YouTube
                                        videoId={song1.url || ""}
                                        opts={{
                                            playerVars: { start: song1.startTime },
                                        }}
                                        onReady={(event: YouTubeEvent) => _onReady(event, 0)}
                                        onEnd={_onEnd}
                                        className="hidden"
                                    />
                                    <YouTube
                                        videoId={song2.url || ""}
                                        opts={{
                                            playerVars: { start: song2.startTime },
                                        }}
                                        onReady={(event: YouTubeEvent) => _onReady(event, 1)}
                                        className="hidden"
                                    />
                                    <YouTube onReady={(event: YouTubeEvent) => _onReadyTemp(event)} videoId="bB8JaY0iZw4" className="hidden" />
                                </article>
                            }
                        </div>
                        <div className={isMobile ? styles.buttonsMobileStyle : styles.buttonsDesktopStyle} onClick={isMobile ? focusInput : undefined}>
                            {!isNextSongButton && isPlaySongButton && (
                                <div className={styles.clickCircle} onClick={isMobile ? () => handlePlaySong(false) : undefined}>
                                    Click Me!
                                </div>
                            )}
                            {!isNextSongButton && !isPlaySongButton && isPassSongButton && (
                                <Button text={`넘기기 ${users.filter((user) => user.status === 1).length}/${users.filter((user) => user.status !== -1).length}`} onClick={passSong} style={{ width: "100%", height: "40px" }} disabled={isNextSongButtonDisable} />
                            )}
                            {isNextSongButton && <Button text="넘기기" onClick={playSong} style={{ width: "100%", height: "40px" }} />}
                        </div>
                    </article>
                )}
                {/* <Button text="노래모음 만들기" onClick={clickButton} style={{ marginBottom: "16px" }} /> */}
                <article style={{ zIndex: 2 }}>{isScoreBoardModalOpen && <ScoreBoardModal isOpen={isScoreBoardModalOpen} onClose={closeScoreBoardModal} />}</article>
            </article>
        </section>
    );
};

export default GameBox;
