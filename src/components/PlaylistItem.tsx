import styles from "./Modals/BoardTypeModal.module.css";

interface PlaylistItemProps {
    id: number;
    rank: number;
    title: string;
    savedUsersCount: number;
    downloaded: boolean;
}

const PlaylistItem = ({ id, title, rank, savedUsersCount, downloaded }: PlaylistItemProps) => {
    let count = savedUsersCount;

    // '담기' 버튼 클릭 시 실행되는 함수
    const handleSave = () => {
        count += 1;
    };

    const storePlaylist = () => {
        // *server
        console.log('store', id)
        handleSave();
    };

    return (
        <ul className={styles.row}>
            <li className={styles.rank}>{rank + 1}</li>
            <li className={`${styles.title} ellipsis`}>{title}</li>
            <li className={styles.download}>{count}</li>
            {downloaded ? (
                <li>
                    <button disabled>담음</button>
                </li>
            ) : (
                <li>
                    <button onClick={storePlaylist}>담기</button>
                </li>
            )}
        </ul>
    );
};

export default PlaylistItem;
