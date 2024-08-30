import React, { useRef } from "react";
import Modal from "../Common/Modal";

import styles from "./css/InputTypeModal.module.css";
import { useJoinGameRoom } from "hooks/useJoinGameRoom";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const EnterRoomModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const { enterGameRoom } = useJoinGameRoom();
    const roomCodeRef = useRef<HTMLInputElement>(null);

    const enterRoom = () => {
        if (roomCodeRef.current) enterGameRoom(roomCodeRef.current?.value);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isFull={false}>
            <div className={styles.divStyle}>
                <input type="text" ref={roomCodeRef} className={styles.inputStyle} placeholder="입장 코드" />
                <button type="button" className={styles.buttonStyle} onClick={enterRoom}>
                    입장
                </button>
            </div>
        </Modal>
    );
};

export default EnterRoomModal;
