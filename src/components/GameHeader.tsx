import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Button from "./Common/Button";

import styles from "./css/GameHeader.module.css";
import SetNameModal from "./Modals/SetNameModal";

const GameHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const roomCode = location.pathname.split("/")[1];

    const [isSetNameModalOpen, setSetNameModalOpen] = useState(false);

    const clickButton = (): void => {
        setSetNameModalOpen(true);
    };

    const closeSetNameModal = () => setSetNameModalOpen(false);

    const copyRoomCode = () => {
        console.log('copy')
    }

    const leaveRoom = () => {
        navigate("/");
    };

    return (
        <article className={styles.container}>
            <div className={styles.roomCodeBox} onClick={copyRoomCode}>{roomCode}</div>
            <div className={styles.buttonContainer}>
                <article style={{ width: "40%", zIndex: 1 }}>
                    <Button text="이름" onClick={clickButton} style={{ width: "100%", height: "100%", fontSize: "14px" }} />
                    <article>{isSetNameModalOpen && <SetNameModal isOpen={isSetNameModalOpen} onClose={closeSetNameModal} />}</article>
                </article>
                <Button text="나가기" onClick={leaveRoom} style={{ width: "55%", height: "100%", fontSize: "14px" }} />
            </div>
        </article>
    );
};

export default GameHeader;
