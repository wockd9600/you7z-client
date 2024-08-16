import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

import { useUser } from "../../hooks/useUser";

import Modal from "../Common/Modal";

import styles from "./css/InputTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const SetNameModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const { updateName } = useUser();
    const name = useSelector((state: RootState) => state.user.name);

    const [isMessage, setIsMessage] = useState(false);
    const [isMessageValue, setIsMessageValue] = useState("변경 완료");

    const inputRef = useRef<HTMLInputElement>(null);

    const handleSetName = async () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            try {
                await updateName(inputRef.current.value);
                setIsMessage(true);
                inputRef.current.value = "";
            } catch (error) {
                if (error instanceof Error) setIsMessageValue(error.message);
                else setIsMessageValue("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
                setIsMessage(true);
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isFull={false}>
            <div>
                <input type="text" className={styles.inputStyle} ref={inputRef} placeholder={name} />
                <button type="button" className={styles.buttonStyle} onClick={handleSetName}>
                    변경
                </button>
                {isMessage && (
                    <p className={styles.messageStyle} style={{ color: isMessageValue === "변경 완료" ? "#009000" : "#FF0000" }}>
                        {isMessageValue}
                    </p>
                )}
            </div>
        </Modal>
    );
};

export default SetNameModal;
