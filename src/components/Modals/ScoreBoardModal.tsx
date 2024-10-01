import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import Modal from "../Common/Modal";
import styles from "./css/BoardTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    // songs: Song[];
}

const ScoreBoardModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const { users } = useSelector((state: RootState) => state.game);
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <article className={styles.table} style={{ width: "100%" }}>
                    <h1 style={{ fontSize: 16, marginBottom: 15 }}>점수판</h1>
                    {[...users]
                        .sort((a, b) => b.score! - a.score!)
                        .map((item, index) => (
                            <ul key={index} className={styles.row} style={{ width: "100%" }}>
                                <li className={`${styles.score}`}>{index + 1}등</li>
                                <li className={`${styles.score}`}>{item.score}점</li>
                                <li className={`${styles.title} ellipsis`} style={{ paddingLeft: 4 }}>
                                    {item.nickname}
                                </li>
                            </ul>
                        ))}
                </article>
            </div>
        </Modal>
    );
};

export default ScoreBoardModal;
