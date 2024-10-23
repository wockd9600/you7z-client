import React, { useEffect } from "react";
import styles from "./modal.module.css"; // 모달 스타일링

interface ModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    isOverlayDismissible?: boolean
    children: React.ReactNode;
    isFull?: boolean;
    zIndex?: number;
}

const Modal = ({ isOpen, onClose, isOverlayDismissible=true, children, isFull = true, zIndex = 0 }: ModalProps) => {
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

    return (
        <>
            {isOpen && (
                <div className={styles.modalOverlay} {...(isOverlayDismissible && { onClick: onClose })}  style={{ zIndex }}>
                    <div className={styles.test1}></div>
                    <div className={`${styles.modalContent} ${isFull ? styles.modalContentIsFull : ""}`} onClick={(e) => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={onClose}>
                            &times;
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
