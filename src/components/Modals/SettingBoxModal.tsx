import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import SocketService from "../../utils/socket";

import Modal from "../Common/Modal";
import Button from "components/Common/Button";

import styles from "./css/BoardTypeModal.module.css";

import { PlayListButton } from "components/Buttons";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: () => void;
}

const SettingBoxModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const [targetScore, setTargetScore] = useState<number>(15);
    const { gameSetting, tempGameSetting } = useSelector((state: RootState) => state.game);
    const handleTargetScoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetScore(Number(event.target.value));
    };

    useEffect(() => {
        setTargetScore(gameSetting.targetScore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const changeRoomSetting = () => {
        // if (![0, 1].includes(gameType)) return;
        if (![5, 10, 15, 20, 255].includes(targetScore)) return;
        if (gameSetting.playlist_id === tempGameSetting.playlist_id && gameSetting.targetScore === targetScore) return onClose();

        const data = {
            playlistId: tempGameSetting.playlist_id,
            // gameType: gameType,
            targetScore: targetScore,
        };

        SocketService.socketEmit("change game setting", data);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <article className={styles.pageButton}></article>
            <div>
                <div className={styles.marginTop}>
                    <label htmlFor="playlist">노래모음</label>
                    <PlayListButton />

                    <label htmlFor="type">타입</label>
                    {/* <select className={styles.inputStyle} value={gameType} onChange={handleGameTypeChange} id="type">
                        <option value={1}>전부 듣기</option>
                        <option value={0}>1초 듣기</option>
                    </select> */}

                    <label htmlFor="goal">목표 점수</label>
                    <select className={styles.inputStyle} value={targetScore} onChange={handleTargetScoreChange} id="goal">
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                        <option value={20}>20</option>
                        <option value={255}>없음</option>
                    </select>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button text="완료" style={{width: "180px", height: "60px"}} onClick={changeRoomSetting} />
                </div>
            </div>
        </Modal>
    );
};

export default SettingBoxModal;
