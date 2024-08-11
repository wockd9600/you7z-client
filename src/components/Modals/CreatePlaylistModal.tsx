import React, { useRef, useState, useEffect, useCallback } from "react";

import Button from "components/Common/Button";
import PageButton from "components/Buttons/PageButton";
import Modal from "../Common/Modal";

import styles from "./BoardTypeModal.module.css";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

interface Song {
    youtubeLink: string;
    startTime: string;
    answer: string;
    description?: string;
}

const CreatePlaylistModal = ({ isOpen, onClose }: SetNameModalProps) => {
    // 쿠기에 저장해놓자

    const youtubeLinkRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    // let playlist = [];
    const [page, setPage] = useState(-1);
    const [songs, setSongs] = useState<Song[]>([]);

    const setSongInputValue = useCallback(
        (page: number) => {
            console.log(songs[page], page);
            const song = songs[page];
            if (song) {
                if (youtubeLinkRef.current) youtubeLinkRef.current.value = song.youtubeLink;
                if (startTimeRef.current) startTimeRef.current.value = song.startTime;
                if (answerRef.current) answerRef.current.value = song.answer;
                if (descriptionRef.current) descriptionRef.current.value = song.description || "";
            }
        },
        [songs]
    );

    useEffect(() => {
        if (page >= 0) setSongInputValue(page);
    }, [page, setSongInputValue]);

    const resetSongForm = () => {
        [youtubeLinkRef, startTimeRef, answerRef, descriptionRef].forEach((ref) => {
            if (ref.current) ref.current.value = "";
        });
    };

    const checkSongFormData = () => {
        return youtubeLinkRef.current?.value && startTimeRef.current?.value && answerRef.current?.value;
    };

    const getSong = (): Song => ({
        youtubeLink: youtubeLinkRef.current?.value || "",
        startTime: startTimeRef.current?.value || "",
        answer: answerRef.current?.value || "",
        description: descriptionRef.current?.value || "",
    });

    const updateSong = (index: number) => {
        const updatedSong = getSong();
        const newSongs = [...songs];
        newSongs[index] = updatedSong;
        setSongs(newSongs);
    };

    const handlePageChange = (newPage: number) => {
        if (checkSongFormData()) updateSong(page);
        resetSongForm();
        setPage(newPage);
    };

    const handleAddSong = () => {
        if (!checkSongFormData()) return;
        const newSong = getSong();
        resetSongForm();
        setSongs([...songs, newSong]);
        console.log(page, songs.length)
        setPage(songs.length + 1);
    };

    const createPlaylist = () => {
        console.log(songs);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <article className={styles.pageButton}>
                {page > -1 && <PageButton direction="&lt;" onClick={() => handlePageChange(page - 1)} />}
                {songs.length !== 0 && page < songs.length && <PageButton direction="&gt;" onClick={() => handlePageChange(page + 1)} />}
            </article>
            {page === -1 && (
                <div>
                    <div className={styles.marginTop}>
                        <p>제목</p>
                        <input type="text" className={styles.inputStyle} />
                    </div>
                    <div className={styles.marginTop}>
                        <p>설명</p>
                        <textarea className={`${styles.inputStyle} ${styles.textareaStyle}`} placeholder="기본적인 룰 설명 ex) 몇 기인지도 맞춰야함, 영어는 답으로 인정 안됨 등"></textarea>
                    </div>
                    <div className={styles.marginTop} style={{ display: "flex", justifyContent: "center" }}>
                        <Button text="다음" onClick={() => handlePageChange(0)}></Button>
                    </div>
                </div>
            )}
            {page !== -1 && (
                <div>
                    <div className={styles.marginTop}>
                        <p>유튜브 링크</p>
                        <input type="text" ref={youtubeLinkRef} className={styles.inputStyle} />
                    </div>
                    <div className={styles.marginTop}>
                        <p>재생 시작 시간</p>
                        <input type="text" ref={startTimeRef} className={styles.inputStyle} defaultValue={0} />
                    </div>
                    <div className={styles.marginTop}>
                        <p>정답</p>
                        <input type="text" ref={answerRef} className={styles.inputStyle} placeholder="복수 정답은 ,로 구분" />{" "}
                    </div>
                    <div className={styles.marginTop}>
                        <p>설명</p>
                        <input type="text" ref={descriptionRef} className={styles.inputStyle} placeholder="정답을 맞췄을 때 보이는 문구" />{" "}
                    </div>
                    <div className={styles.marginTop} style={{ display: "flex", justifyContent: "space-around" }}>
                        <Button text="노래 추가" onClick={handleAddSong}></Button>
                        <Button text="만들기" onClick={createPlaylist}></Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default CreatePlaylistModal;
