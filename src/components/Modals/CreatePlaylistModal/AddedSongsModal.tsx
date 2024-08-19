import React from "react";
import Modal from "../../Common/Modal";

import styles from "../css/BoardTypeModal.module.css";

import { Song } from "types";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    songs: Song[];
}

const AddedSongsModal = ({ isOpen, onClose, songs }: SetNameModalProps) => {
    console.log(songs);
    return (
        <Modal isOpen={isOpen} onClose={onClose} zIndex={10}>
            <div className={styles.container}>
                <article className={styles.table} style={{ width: "100%" }}>
                    <ul className={styles.column} style={{ width: "100%" }}>
                        <li className={styles.title}>정답</li>
                        <li className={styles.title}>시작시간</li>
                    </ul>
                    {songs.map((item, index) => (
                        <ul key={index} className={styles.row} style={{ width: "100%" }}>
                            <li className={`${styles.title} ellipsis`}>{item.answer}</li>
                            <li className={`${styles.time} ellipsis`}>{item.startTime}</li>
                        </ul>
                    ))}
                </article>
            </div>
        </Modal>
    );
};

export default AddedSongsModal;
