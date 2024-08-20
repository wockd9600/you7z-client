import { useState } from "react";
import styles from "./Modals/css/BoardTypeModal.module.css";

interface PlaylistItemProps {
    id: number;
    rank: number;
    title: string;
    score: number;
    downloaded: boolean;
    storePlaylist: (id: number) => void;
}

const PlaylistItem = ({ id, title, rank, score, downloaded, storePlaylist }: PlaylistItemProps) => {
    const [count, setCount] = useState(score);
    const [stored, setStored] = useState(downloaded);

    // '담기' 버튼 클릭 시 실행되는 함수
    const handleSave = () => {
        setCount(count + 1);
        setStored(true);
    };

    const clickButtonStore = async () => {
        // 서버에 요청 보내기
        await storePlaylist(id);
        // 저장 후 처리
        handleSave();
    };

    return (
        <ul className={styles.row}>
            <li className={styles.rank}>{rank + 1}</li>
            <li className={`${styles.title} ellipsis`}>{title}</li>
            <li className={styles.download}>{count}</li>
            {stored ? (
                <li>
                    <button disabled>담음</button>
                </li>
            ) : (
                <li>
                    <button onClick={clickButtonStore}>담기</button>
                </li>
            )}
        </ul>
    );
};

export default PlaylistItem;
