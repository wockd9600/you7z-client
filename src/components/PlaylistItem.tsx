import React from "react";
import styles from "./Modals/css/BoardTypeModal.module.css";

import { Playlist } from "types";
import { PlaylistModalType } from "constants/enums";

interface PlaylistItemProps {
    item: Playlist;
    rank: number;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    modalType: number;
}

const PlaylistItem = ({ item, rank, onClose, modalType }: PlaylistItemProps) => {
    const { title, length } = item;

    return (
        <ul className={styles.row}>
            <li className={styles.rank}>{rank + 1}</li>
            <li className={`${styles.title} ellipsis`}>{title}</li>
            <li className={styles.download}>{length}</li>
            {/* <li className={styles.download}>{count}</li> */}
            {modalType === PlaylistModalType.POPULAR && 
                <li>
                    <button onClick={onClose}>선택</button>
                </li>
            }
        </ul>
    );
};

export default PlaylistItem;
