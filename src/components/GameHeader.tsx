import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { resetGameState } from "../redux/gameSlice";

import SocketService from "utils/socket";

import Button from "./Common/Button";
import SetNameModal from "./Modals/SetNameModal";

import styles from "./css/GameHeader.module.css";

import { GameStatus } from "constants/enums";

const GameHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSetNameModalOpen, setSetNameModalOpen] = useState(false);

    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, status, users } = useSelector((state: RootState) => state.game);

    const clickButton = (): void => {
        setSetNameModalOpen(true);
    };

    const closeSetNameModal = () => setSetNameModalOpen(false);

    const copyRoomCode = () => {
        console.log("copy");
    };

    const leaveRoom = () => {
        const index = users.findIndex((item) => item.userId === userId);
        const user = users[index];
        SocketService.socketEmit("leave game", { userName: user.nickname });
        dispatch(resetGameState());
        navigate("/");
    };

    return (
        <article className={styles.container}>
            <div className={styles.roomCodeBox} onClick={copyRoomCode}>
                {roomCode}
            </div>
            {status === GameStatus.NOT_STARTED ? (
                <div className={styles.buttonContainer}>
                    <article style={{ width: "40%", zIndex: 1 }}>
                        <Button text="이름" onClick={clickButton} style={{ width: "100%", height: "100%", fontSize: "14px" }} />
                        <article>{isSetNameModalOpen && <SetNameModal isOpen={isSetNameModalOpen} onClose={closeSetNameModal} />}</article>
                    </article>
                    <Button text="나가기" onClick={leaveRoom} style={{ width: "55%", height: "100%", fontSize: "14px" }} />
                </div>
            ) : (
                <div className={styles.buttonContainer}>
                    <article style={{ width: "40%", zIndex: 1 }}>
                        <Button text="이름" disabled={true} style={{ width: "100%", height: "100%", fontSize: "14px" }} />
                    </article>
                    <Button text="나가기" disabled={true} style={{ width: "55%", height: "100%", fontSize: "14px" }} />
                </div>
            )}
        </article>
    );
};

export default GameHeader;
