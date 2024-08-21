import React, { useEffect, useState } from "react";

import Modal from "../Common/Modal";
import PlaylistItem from "components/PlaylistItem";
import PageButton from "components/Buttons/PageButton";

import { usePlaylist } from "../../hooks/usePlaylist";

import styles from "./css/BoardTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
    modalType: number;
}

const PlaylistModal = ({ isOpen, onClose, modalType }: SetNameModalProps) => {
    const { playlists, getPlaylists, setPlaylists, storePlaylist, cancelStorePlaylist } = usePlaylist();

    const [page, setPage] = useState(1);
    // playlists.push({ id: 1, title: "2024 노래 모음", score: 8, description: "", downloaded: false });
    // playlists.push({ id: 2, title: "추억의 애니 노래", score: 1, description: "", downloaded: true });
    // playlists.push({ id: 3, title: "몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라", score: 4, description: "", downloaded: false });
    // playlists.push({ id: 4, title: "최악의 노래 모음", score: 4, description: "", downloaded: false });
    // playlists.push({ id: 1, title: "2024 노래 모음", score: 8, description: "", downloaded: false });
    // playlists.push({ id: 2, title: "추억의 애니 노래", score: 1, description: "", downloaded: true });
    // playlists.push({ id: 3, title: "몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라몰라", score: 4, description: "", downloaded: false });
    // playlists.push({ id: 4, title: "최악의 노래 모음", score: 4, description: "", downloaded: false });
    // playlists.push({ id: 1, title: "2024 노래 모음", score: 8, description: "", downloaded: false });
    // playlists.push({ id: 2, title: "추억의 애니 노래", score: 1, description: "", downloaded: true });

    useEffect(() => {
        getPlaylists(page, modalType);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const [value, setValue] = useState("");

    const searchPlaylist = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            console.log("Input value:", value);
            setPlaylists([]);
            setTimeout(() => {
                setValue("");
            }, 0);
        }
    };

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
                    {playlists && playlists.map((item, index) => <PlaylistItem key={index} rank={index} type={modalType} item={item} storePlaylist={storePlaylist} cancelStorePlaylist={cancelStorePlaylist} />)}
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
