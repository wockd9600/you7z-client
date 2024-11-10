import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { setGameSetting, GameAnswer, addAnswerMessage } from "../redux/gameSlice";

import SocketService from "../utils/socket";

import SettingBoxModal from "./Modals/SettingBoxModal";
import Button from "./Common/Button";

import styles from "./css/GameBox.module.css";

const SettingsPanel = () => {
    const [isSettingBoxModalOpen, setSettingBoxModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, managerId, users, gameSetting } = useSelector((state: RootState) => state.game);
    const isManager = managerId === userId;

    useEffect(() => {
        if (!roomCode) return;

        const handleChangeGameSetting = (data: { playlist_id: number; title: string; /* gameType: number; */ targetScore: number; answer: GameAnswer }) => {
            const { playlist_id, title, targetScore, answer } = data;
            
            const newGameSetting = {
                ...gameSetting,
                playlist_id,
                title,
                targetScore,
            };

            dispatch(setGameSetting(newGameSetting))
            dispatch(addAnswerMessage(answer));
            closeSettingBoxModal();
        };

        const socket = SocketService.getInstance(roomCode);

        socket.on("change game setting", handleChangeGameSetting);

        return () => {
            socket.off("change game setting");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    const clickButton = () => {
        if (!isManager) return;
        setSettingBoxModalOpen(true);
    };

    const closeSettingBoxModal = () => setSettingBoxModalOpen(false);
    const handleClickGameStart = () => {
        if (1 >= users.length || users.length > 7) return alert("인원수가 너무 적습니다.");
        SocketService.socketEmit("game start");
    };

    return (
        <article className={styles.settingsPanelContainer}>
            <ul className={`${styles.setingBox} ${isManager && styles.setingBoxManager}`} onClick={clickButton}>
                <li>{gameSetting.title}</li>
                {/* <li>
                    듣기시간 : <span>{gameSetting.gameType ? "전부 듣기" : "1초 듣기"}</span>
                </li> */}
                <li>
                    목표점수 : <span>{gameSetting.targetScore === 255 ? "없음" : gameSetting.targetScore}</span>
                </li>
            </ul>

            {isManager && <Button text="게임시작" style={{ width: "100%", height: "40px", backgroundColor: "#A1E3A1" }} onClick={handleClickGameStart} />}

            <article style={{ zIndex: 2 }}>{isManager && isSettingBoxModalOpen && <SettingBoxModal isOpen={isSettingBoxModalOpen} onClose={closeSettingBoxModal} />}</article>
        </article>
    );
};

export default SettingsPanel;
