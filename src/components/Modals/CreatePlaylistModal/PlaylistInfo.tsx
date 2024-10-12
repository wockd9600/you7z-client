import React, { useState } from "react";
import Button from "components/Common/Button";
import styles from "../css/BoardTypeModal.module.css";

interface PlaylistInfoProps {
    playlistTitle: string;
    playlistDescription: string;
    setPlaylistTitle: (title: string) => void;
    setPlaylistDescription: (description: string) => void;
    handlePageChange: (newPage: number) => void;
}

const PlaylistInfo = ({ playlistTitle, playlistDescription, setPlaylistTitle, setPlaylistDescription, handlePageChange }: PlaylistInfoProps) => {
    const [isTitle, setIsTitle] = useState(false);
    const [isDescription, setIsDescription] = useState(false);

    const handleBlur = (e: any, el: string) => {
        if (!e || !e.target) return;
        if (!e.target.value) return;
        sessionStorage.setItem(`cp-${el}`, e.target.value);
    };

    const handleOnchangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => setPlaylistTitle(e.target.value);
    const handleOnchangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => setPlaylistDescription(e.target.value);

    const nextPage = () => {
        if (!playlistTitle) {
            setIsTitle(true);
        } else if (!playlistDescription) {
            setIsTitle(false);
            setIsDescription(true);
        } else {
            setIsTitle(false);
            setIsDescription(false);
            handlePageChange(0);
        }
    };

    return (
        <div>
            <div className={styles.marginTop}>
                <p>제목</p>
                <input type="text" className={styles.inputStyle} defaultValue={playlistTitle} onChange={handleOnchangeTitle} onBlur={(e) => handleBlur(e, "p-title")} />
                {isTitle && (
                    <p className={styles.inputFormMessage} style={{ color: "#FF0000", bottom: "-3px" }}>
                        제목을 입력해 주세요.
                    </p>
                )}
            </div>
            <div className={styles.marginTop}>
                <p>설명</p>
                <textarea className={`${styles.inputStyle} ${styles.textareaStyle}`} defaultValue={playlistDescription} onChange={handleOnchangeDescription} placeholder="기본적인 룰 설명 ex) 몇 기인지도 맞춰야함, 영어는 답으로 인정 안됨 등" onBlur={(e) => handleBlur(e, "p-description")}></textarea>
                {isDescription && (
                    <p className={styles.inputFormMessage} style={{ color: "#FF0000" }}>
                        설명을 입력해 주세요.
                    </p>
                )}
            </div>
            <div className={styles.marginTop} style={{ display: "flex", justifyContent: "center" }}>
                <Button text="다음" onClick={nextPage}></Button>
            </div>
        </div>
    );
};

export default PlaylistInfo;
