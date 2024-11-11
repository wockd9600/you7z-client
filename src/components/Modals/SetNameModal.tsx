import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";

import SocketService from "utils/socket";

import { useUser } from "../../hooks/useUser";

import Modal from "../Common/Modal";

import styles from "./css/InputTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const SetNameModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const { updateName } = useUser();

    const inputRef = useRef<HTMLInputElement>(null);
    const [isMessage, setIsMessage] = useState(false);
    const [isMessageValue, setIsMessageValue] = useState("변경 완료");

    const name = useSelector((state: RootState) => state.user.name);
    const { roomCode } = useSelector((state: RootState) => state.game);

    const handleSetName = async () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            try {
                const name = inputRef.current.value;

                await updateName(name);
                setIsMessage(true);
                if (roomCode) {
                    SocketService.socketEmit("change user name", { name });
                }

                inputRef.current.value = "";
            } catch (error) {
                if (error instanceof Error) setIsMessageValue(error.message);
                else setIsMessageValue("알 수 없는 오류입니다. 잠시 후 다시 시도해주세요.");
                setIsMessage(true);
            }
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            handleSetName();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} isFull={false}>
            <div className={styles.divStyle}>
                <input type="text" className={styles.inputStyle} ref={inputRef} onKeyDown={handleKeyDown} placeholder={name} />
                {isMessage && (
                    <p className={styles.messageStyle} style={{ color: isMessageValue === "변경 완료" ? "#009000" : "#FF0000" }}>
                        {isMessageValue}
                    </p>
                )}
                <button type="button" className={styles.buttonStyle} onClick={handleSetName}>
                    변경
                </button>
            </div>
        </Modal>
    );
};

export default SetNameModal;
