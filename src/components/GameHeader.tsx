import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { resetGameState } from "../redux/gameSlice";

import SocketService from "utils/socket";

import Button from "./Common/Button";
import SetNameModal from "./Modals/SetNameModal";
import GameDescriptionModal from "./Modals/GameDescriptionModal";

import styles from "./css/GameHeader.module.css";

import { GameStatus } from "constants/enums";

const GameHeader = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isSetNameModalOpen, setSetNameModalOpen] = useState(false);
    const [isDescriptionModalOpen, setDescriptionModalOpen] = useState(false);

    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, status, users } = useSelector((state: RootState) => state.game);

    const clickSetNameButton = (): void => {
        setSetNameModalOpen(true);
    };

    const clickDescriptionButton = (): void => {
        setDescriptionModalOpen(true);
    };

    const closeSetNameModal = () => setSetNameModalOpen(false);
    const closeDescriptionModal = () => setDescriptionModalOpen(false);

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
                    <article style={{ width: "42%", zIndex: 2 }}>
                        <Button text="이름" onClick={clickSetNameButton} style={{ width: "100%", height: "100%"}} />
                        <article>{isSetNameModalOpen && <SetNameModal isOpen={isSetNameModalOpen} onClose={closeSetNameModal} />}</article>
                    </article>
                    <Button text="나가기" onClick={leaveRoom} style={{ width: "56%", height: "100%", fontSize: "24px" }} />
                </div>
            ) : (
                <div className={styles.buttonContainer}>
                    <article style={{ width: "42%", zIndex: 2 }}>
                        <Button text="설명" onClick={clickDescriptionButton} style={{ width: "100%", height: "100%" }} />
                        <article>{isDescriptionModalOpen && <GameDescriptionModal isOpen={isDescriptionModalOpen} onClose={closeDescriptionModal} />}</article>
                    </article>
                    <Button text="나가기" disabled={true} style={{ width: "56%", height: "100%" }} />
                </div>
            )}
        </article>
    );
};

export default GameHeader;
