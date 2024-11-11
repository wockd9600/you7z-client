import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { removeUser, updateUserInfo, resetGameState, GameAnswer, addAnswerMessage } from "../redux/gameSlice";

import SocketService from "../utils/socket";

import styles from "./css/GameBox.module.css";

const UserPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, status, managerId, users } = useSelector((state: RootState) => state.game);
    // const users = [
    //     { userId: 0, status: 1, score: 0, isReady: false, nickname: "음흉한 까마귀"},
    //     { userId: 0, status: 1, score: 0, isReady: false, nickname: "듬직한 거북이"},
    //     { userId: 0, status: 1, score: 0, isReady: false, nickname: "이리저리 고양이"},
    //     { userId: 0, status: 1, score: 0, isReady: false, nickname: "재채기 앵무새"},
    //     { userId: 0, status: 1, score: 0, isReady: false, nickname: "전직건달 햄스터"},
    //     { userId: 0, status: 1, score: 0, isReady: false, nickname: "소심한 호랑이"},
    //     { userId: 0, status: 1, score: 0, isReady: false, nickname: "안녕하세요"},
    // ]
    const isManager = managerId === userId;

    useEffect(() => {
        if (!roomCode) return;

        const socket = SocketService.getInstance(roomCode);

        const handleUserKick = (answer: GameAnswer) => {
            const kickedUserId = answer.userId;
            if (userId === kickedUserId) {
                alert("강퇴되었습니다.");
                dispatch(resetGameState());
                navigate("/");
            } else {
                dispatch(removeUser(kickedUserId));
                dispatch(addAnswerMessage(answer));
            }
        };

        const handleChangeUserName = (data: { userId: number; name: string }) => {
            const { userId, name } = data;
            dispatch(updateUserInfo({ userId, nickname: name }));
        };

        const handleChangeUserStatus = (data: { userId: number; status: number }) => {
            const { userId, status } = data;
            dispatch(updateUserInfo({ userId, status }));
        };

        socket.on("user kick", handleUserKick);
        socket.on("change user name", handleChangeUserName);
        socket.on("change user status", handleChangeUserStatus);

        return () => {
            socket.off("user kick");
            socket.off("change user name");
            socket.off("change user status");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    const kickUser = (kickedUserId: number) => {
        SocketService.socketEmit("user kick", { kickedUserId });
    };

    return (
        <article className={styles.userPanelContainer}>
            {[...users]
                .map((item, index) => {
                    return { ...item, order: index };
                })
                .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
                .map((item, index) => {
                    return (
                        <ul key={index} className={styles.userRow}>
                            <li className={`${styles.userColor} user-color${item.order + 1}`}></li>
                            <li>{item.nickname}</li>
                            <li>{item.score}</li>
                            {item.isReady}
                            {status === 1 && item.isReady === false && <li>로딩중..</li>}
                            {item.status === -1 && <li style={{ color: "red" }}>연결x</li>}
                            {!status && isManager && item.userId !== userId && (
                                <li onClick={() => kickUser(item.userId)} style={{ color: "red", cursor: "pointer" }}>
                                    x
                                </li>
                            )}
                        </ul>
                    );
                })}
        </article>
    );
};

export default UserPanel;
