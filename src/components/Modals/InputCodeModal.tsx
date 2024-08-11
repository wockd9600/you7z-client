import React from "react";
import Modal from "../Common/Modal";

import styles from "./InputTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const InputCodeModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const enterRoom = () => {
        // *수정
        // route 
        console.log('enter room')
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isFull={false}>
            <div className={styles.divStyle}>
                <input type="text" className={styles.inputStyle} placeholder="입장 코드" />
                <button type="button" className={styles.buttonStyle} onClick={enterRoom}>
                    입장
                </button>
            </div>
        </Modal>
    );
};

export default InputCodeModal;
