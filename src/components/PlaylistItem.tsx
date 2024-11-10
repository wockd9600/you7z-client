import React from "react";
import { useDispatch } from "react-redux";
import { setTempGameSetting } from "../redux/gameSlice";

import { Playlist } from "types";
import { PlaylistModalType } from "constants/enums";

import styles from "./Modals/css/BoardTypeModal.module.css";

interface PlaylistItemProps {
    item: Playlist;
    rank: number;
    onClose: () => void;
    modalType: number;
}

const PlaylistItem = ({ item, rank, onClose, modalType }: PlaylistItemProps) => {
    const { id, title, length } = item;

    const dispatch = useDispatch();

    const changeTempGameSetting = () => {
        console.log("changeTempGameSetting");
        dispatch(setTempGameSetting({ playlist_id: id, title }));
        onClose();
    };

    return (
        <ul className={styles.row} style={{ cursor: "pointer" }} onClick={changeTempGameSetting}>
            <li className={styles.rank}>{rank + 1}</li>
            <li className={`${styles.title} ellipsis`}>{title}</li>
            <li className={styles.download}>{length}</li>
            {/* <li className={styles.download}>{count}</li> */}
            {modalType === PlaylistModalType.POPULAR && (
                <li>
                    <button className={styles.mobileTextSize}>선택</button>
                </li>
            )}
        </ul>
    );
};

export default PlaylistItem;
