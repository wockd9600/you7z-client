import React, { useEffect } from "react";
import styles from "./modal.module.css"; // 모달 스타일링

interface ModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    children: React.ReactNode;
    isFull?: boolean;
}

const Modal = ({ isOpen, onClose, children, isFull = true }: ModalProps) => {
    useEffect(() => {
        // ESC 키를 감지하는 함수
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                (onClose as () => void)();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
        }

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={`${styles.modalContent} ${isFull ? styles.modalContentIsFull : ""}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    &times;
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
