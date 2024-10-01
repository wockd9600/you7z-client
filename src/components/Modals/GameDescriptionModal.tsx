import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import Modal from "../Common/Modal";

import styles from "./css/BoardTypeModal.module.css";

interface GameDescriptionModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    // songs: Song[];
}

const GameDescriptionModal = ({ isOpen, onClose }: GameDescriptionModalProps) => {
    const { gameSetting } = useSelector((state: RootState) => state.game);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <article className={styles.table} style={{ width: "100%" }}>
                    <h1 style={{ fontSize: 16, marginBottom: 15 }}>게임 설명</h1>
                    <h2>{gameSetting.playlist}</h2>
                    {gameSetting.description}
                </article>
            </div>
        </Modal>
    );
};

export default GameDescriptionModal;
