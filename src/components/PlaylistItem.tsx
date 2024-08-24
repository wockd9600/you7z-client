import { useState } from "react";
import styles from "./Modals/css/BoardTypeModal.module.css";

import { PlaylistModalType } from "constants/enums";
import { Playlist } from "types";

interface PlaylistItemProps {
    item: Playlist,
    type: number;
    rank: number;
    storePlaylist: (id: number) => void;
    cancelStorePlaylist: (id: number) => void;
}

const PlaylistItem = ({ item, rank, type, storePlaylist, cancelStorePlaylist }: PlaylistItemProps) => {
    const { id, title, score, length } = item;

    const [count, setCount] = useState(score);
    const [stored, setStored] = useState(item.downloaded ? item.downloaded : false);

    // '담기' 버튼 클릭 시 실행되는 함수
    const handleSave = () => {
        setCount(count + 1);
        setStored(true);
    };

    const clickButtonStore = async () => {
        await storePlaylist(id);
        handleSave();
    };

    const clickButtonCancelStore = () => cancelStorePlaylist(id);

    return (
        <ul className={styles.row}>
            <li className={styles.rank}>{rank + 1}</li>
            <li className={`${styles.title} ellipsis`}>{title}</li>
            <li className={styles.download}>{length}</li>
            {/* <li className={styles.download}>{count}</li> */}
            {type === PlaylistModalType.POPULAR && <li>{stored ? <button disabled>담음</button> : <button onClick={clickButtonStore}>담기</button>}</li>}
            {type === PlaylistModalType.MY && (
                <li>
                    <button onClick={clickButtonCancelStore}>취소</button>
                </li>
            )}
        </ul>
    );
};

export default PlaylistItem;
