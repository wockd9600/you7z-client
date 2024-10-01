import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import axios from "../../utils/axios";
import SocketService from "../../utils/socket";

import Modal from "../Common/Modal";
import Button from "components/Common/Button";

import styles from "./css/BoardTypeModal.module.css";

import { Playlist } from "types";
import { PlaylistModalType } from "constants/enums";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: () => void;
}

const SettingBoxModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const [selectedOption, setSelectedOption] = useState<number>(-1);
    // const [gameType, setGameType] = useState<number>(1);
    const [targetScore, setTargetScore] = useState<number>(255);
    const [options, setOptions] = useState([{ value: -1, label: "로딩 중" }]);

    // options는 세션에 넣자.
    const gameSetting = useSelector((state: RootState) => state.game.gameSetting);

    useEffect(() => {
        async function fetchOptions() {
            try {
                const response = await axios.get("/playlist", { params: { page: 1, type: PlaylistModalType.MY_WITH_CREATED } });
                if (response) {
                    const myPlaylist = await response.data.playlists;
                    const newOptions = myPlaylist.map((item: Playlist) => {
                        return {
                            value: item.id,
                            label: `[${item.length}] ${item.title}`,
                        };
                    });
                    setSelectedOption(newOptions[0].value);
                    setOptions(newOptions);
                }
            } catch (error) {
                console.error("Failed to fetch options:", error);
            }
        }

        // setGameType(gameSetting.gameType);
        setTargetScore(gameSetting.targetScore);
        fetchOptions();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(Number(event.target.value));
    };

    // const handleGameTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setGameType(Number(event.target.value));
    // };

    const handleTargetScoreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetScore(Number(event.target.value));
    };

    const changeRoomSetting = () => {
        // if (![0, 1].includes(gameType)) return;
        if (![5, 10, 15, 20, 255].includes(targetScore)) return;

        const data = {
            playlistId: selectedOption,
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
                    <select className={styles.inputStyle} id="playlist" value={selectedOption} onChange={handleOptionChange}>
                        {options.map((option) => (
                            <option className="ellipsis" key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
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
                    <Button text="완료" onClick={changeRoomSetting} />
                </div>
            </div>
        </Modal>
    );
};

export default SettingBoxModal;
