import React, { useState } from "react";

import Modal from "../Common/Modal";
import PlaylistItem from "components/PlaylistItem";
import PageButton from "components/Buttons/PageButton";

import styles from "./css/BoardTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const PlaylistModal = ({ isOpen, onClose }: SetNameModalProps) => {
    let playlist = [];
    playlist.push({ rank: 0, id: 1, title: "2024 노래 모음", savedUsersCount: 8, downloaded: false });
    playlist.push({ rank: 1, id: 2, title: "추억의 애니 노래", savedUsersCount: 1, downloaded: true });
    playlist.push({ rank: 2, id: 3, title: "몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라", savedUsersCount: 4, downloaded: false });
    playlist.push({ rank: 3, id: 4, title: "최악의 노래 모음", savedUsersCount: 4, downloaded: false });
    playlist.push({ rank: 0, id: 1, title: "2024 노래 모음", savedUsersCount: 8, downloaded: false });
    playlist.push({ rank: 1, id: 2, title: "추억의 애니 노래", savedUsersCount: 1, downloaded: true });
    playlist.push({ rank: 2, id: 3, title: "몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라", savedUsersCount: 4, downloaded: false });
    playlist.push({ rank: 3, id: 4, title: "최악의 노래 모음", savedUsersCount: 4, downloaded: false });
    playlist.push({ rank: 0, id: 1, title: "2024 노래 모음", savedUsersCount: 8, downloaded: false });
    playlist.push({ rank: 1, id: 2, title: "추억의 애니 노래", savedUsersCount: 1, downloaded: true });
    // 쿠기에 저장해놓자

    const [value, setValue] = useState("");

    const searchPlaylist = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            console.log("Input value:", value);
            playlist = [];
            setTimeout(() => {
                setValue("");
            }, 0);
        }
    };

    const [page, setPage] = useState(0);

    const nextPage = () => {
        changePage(page + 1);
        console.log("nextPage");
    };

    const previousPage = () => {
        changePage(page - 1);
    };

    const changePage = (page: number) => {
        // *server
        setPage(page);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.container}>
                <input type="text" className={`${styles.inputStyle} ${styles.inputStyleTextCenter}`} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={searchPlaylist} placeholder="노래모음 검색" />
                <article className={styles.table} style={{ width: "100%" }}>
                    <ul className={styles.column} style={{ width: "100%" }}>
                        <li className={styles.rank}>순위</li>
                        <li className={styles.title}>제목</li>
                        <li className={styles.download}>점수</li>
                    </ul>
                    {playlist.map((item, index) => (
                        <PlaylistItem key={index} rank={item.rank} id={item.id} title={item.title} savedUsersCount={item.savedUsersCount} downloaded={item.downloaded} />
                    ))}
                </article>
                <article className={styles.pageButton}>
                    <PageButton direction="&lt;" onClick={previousPage} />
                    <PageButton direction="&gt;" onClick={nextPage} />
                </article>
            </div>
        </Modal>
    );
};

export default PlaylistModal;
