import React from "react";
import Modal from "../Common/Modal";

import styles from "./css/BoardTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    // songs: Song[];
}

const ScoreBoardModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const songs = [
        { name: "김딴딴", score: 1 },
        { name: "김딴딴", score: 34 },
        { name: "김딴sdfjlaskjdfkjlksadjlfkjsdf딴", score: 2 },
        { name: "김딴딴", score: 35 },
    ];
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <article className={styles.table} style={{ width: "100%" }}>
                    <h1 style={{ fontSize: 16, marginBottom: 15 }}>점수판</h1>
                    {/* <ul className={styles.column} style={{ width: "100%" }}>
                        <li className={styles.title}>정답</li>
                        <li className={styles.title}>시작시간</li>
                    </ul> */}
                    {songs
                        .sort((a, b) => b.score - a.score)
                        .map((item, index) => (
                            <ul key={index} className={styles.row} style={{ width: "100%" }}>
                                <li className={`${styles.score}`}>{index + 1}등</li>
                                <li className={`${styles.score}`}>{item.score}점</li>
                                <li className={`${styles.title} ellipsis`} style={{paddingLeft: 4}}>{item.name}</li>
                            </ul>
                        ))}
                </article>
            </div>
        </Modal>
    );
};

export default ScoreBoardModal;
