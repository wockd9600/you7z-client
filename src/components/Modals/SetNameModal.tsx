import React from "react";
import Modal from "../Common/Modal";

import styles from "./css/InputTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const SetNameModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const isMessage = false;
    let message = "변경 완료";
    let userName = "ㅇㅇ";

    const setName = () => {
        //*server
        console.log("set name");
    };

    const changeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        // 검증
        userName = e.target.value;
        console.log(e.target.value);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isFull={false}>
            <div>
                <input type="text" className={styles.inputStyle} onChange={changeInputValue} placeholder={userName} />
                <button type="button" className={styles.buttonStyle} onClick={setName}>
                    변경
                </button>
                {isMessage && <p className={styles.messageStyle}>{message}</p>}
            </div>
        </Modal>
    );
};

export default SetNameModal;
