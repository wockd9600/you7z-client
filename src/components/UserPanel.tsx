import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { removeUser, updateUserName, resetGameState, GameAnswer, addAnswerMessage } from "../redux/gameSlice";

import SocketService from "../utils/socket";

import styles from "./css/GameBox.module.css";

const UserPanel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, status, managerId, users } = useSelector((state: RootState) => state.game);
    const isManager = managerId === userId;

    useEffect(() => {
        if (!roomCode) return;

        const socket = SocketService.getInstance(roomCode);

        const handleUserKick = (data: { kickedUserId: number; answer: GameAnswer }) => {
            const { kickedUserId, answer } = data;
            
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
            dispatch(updateUserName({ userId, name }));
        };

        socket.on("change user name", handleChangeUserName);
        socket.on("user kick", handleUserKick);

        return () => {
            socket.off("user kick");
            socket.off("change user name");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    const kickUser = (kickedUserId: number) => {
        SocketService.socketEmit("user kick", { kickedUserId });
    };

    return (
        <article className={styles.userPanelContainer}>
            {users.map((item, index) => {
                return (
                    <ul key={index} className={styles.userRow}>
                        <li className={`${styles.userColor} user-color${index + 1}`}></li>
                        <li>{item.nickname}</li>
                        <li>{item.score}</li>
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
