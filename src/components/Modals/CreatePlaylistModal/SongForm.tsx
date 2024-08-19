import React from "react";

import CreatePlaylistModalFooter from "./CreatePlaylistModalFooter";

import styles from "../css/BoardTypeModal.module.css";

import { getFormattedTimeValue, compareInputTimeAndVideoDuration } from "./helpers";

interface SongFormProps {
    youtubeLinkRef: React.RefObject<HTMLInputElement>;
    startTimeRef: React.RefObject<HTMLInputElement>;
    answerRef: React.RefObject<HTMLInputElement>;
    descriptionRef: React.RefObject<HTMLInputElement>;
    page: number;
    songsLength: number;
    handleAddSong: () => void;
    handleDeleteSong: () => void;
    videoData: any;
    handleCheckVideo: (url: string | undefined) => void;
    validationAddSong: (youtubeLinkValue: string, answerValue: string) => boolean;
}

const SongForm = ({ youtubeLinkRef, startTimeRef, answerRef, descriptionRef, page, songsLength, handleAddSong, handleDeleteSong, videoData, handleCheckVideo, validationAddSong }: SongFormProps) => {
    const { videoExists, isAnswer, videoTitle, videoDuration, videoThumbnail, time, setTime } = videoData;

    const handleInputChange = (e: { target: { value: string } }) => {
        let value = e.target.value.replace(/[^0-9]/g, ""); // 숫자 외 문자 제거
        if (value.length > 6) value = value.slice(0, 6); // 최대 6자리까지만 허용

        let formattedValue = getFormattedTimeValue(value);

        if (value.length === 6) {
            if (compareInputTimeAndVideoDuration(formattedValue, videoDuration)) {
                alert("입력된 시간이 영상 시간보다 큽니다.");
                formattedValue = formattedValue.slice(0, -1);
            }
        }

        setTime(formattedValue);
    };

    const checkHandleAddSong = () => {
        const youtubeLinkValue = youtubeLinkRef.current?.value || "";
        const answerValue = answerRef.current?.value || "";

        const success = validationAddSong(youtubeLinkValue, answerValue);
        if (success) handleAddSong();
    };

    return (
        <div>
            <div className={styles.marginTop}>
                <p>유튜브 링크</p>
                <input type="text" ref={youtubeLinkRef} className={styles.inputStyle} style={{ marginBottom: 0 }} placeholder="YouTube URL을 입력하세요" />
                <button onClick={() => handleCheckVideo(youtubeLinkRef.current?.value)}>비디오 확인</button>
                {videoExists > 0 && (
                    <div>
                        {videoExists === 1 ? (
                            <article style={{ width: "100%" }}>
                                <p>{videoTitle}</p>
                                <p>비디오 길이: {videoDuration}</p>
                                <img src={videoThumbnail} style={{ width: "100%" }} alt="썸네일" />
                            </article>
                        ) : (
                            <p className={styles.inputFormMessage} style={{ color: "#FF0000", right: 0 }}>
                                {videoExists === 2 ? "유효한 YouTube URL이 아닙니다." : "비디오 확인을 해주세요."}
                            </p>
                        )}
                    </div>
                )}
            </div>
            <div className={styles.marginTop}>
                <p>재생 시작 시간</p>
                <input type="text" ref={startTimeRef} className={styles.inputStyle} value={time} placeholder="00:00:00" onChange={handleInputChange} maxLength={8} />
            </div>
            <div className={styles.marginTop}>
                <p>정답</p>
                <input type="text" ref={answerRef} className={styles.inputStyle} placeholder="중복 정답 가능 ,로 구분" />
                {isAnswer && (
                    <p className={styles.inputFormMessage} style={{ color: "#FF0000" }}>
                        정답을 입력해주세요.
                    </p>
                )}
            </div>
            <div className={styles.marginTop}>
                <p>설명</p>
                <input type="text" ref={descriptionRef} className={styles.inputStyle} placeholder="정답을 맞췄을 때 보이는 문구" />
            </div>
            <CreatePlaylistModalFooter page={page} songsLength={songsLength} handleAddSong={checkHandleAddSong} handleDeleteSong={handleDeleteSong} />
        </div>
    );
};

export default SongForm;
