import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { setPlaylist, /* setGameType, */ setTargetScore, GameAnswer, addAnswerMessage } from "../redux/gameSlice";

import SocketService from "../utils/socket";

import SettingBoxModal from "./Modals/SettingBoxModal";
import Button from "./Common/Button";

import styles from "./css/GameBox.module.css";

const SettingsPanel = () => {
    const [isSettingBoxModalOpen, setSettingBoxModalOpen] = useState(false);

    const dispatch = useDispatch();
    const { userId } = useSelector((state: RootState) => state.user);
    const { roomCode, managerId, gameSetting } = useSelector((state: RootState) => state.game);
    const isManager = managerId === userId;

    useEffect(() => {
        if (!roomCode) return;

        const handleChangeGameSetting = (data: { playlist: string; /* gameType: number; */ targetScore: number; answer: GameAnswer }) => {
            const { playlist, /* gameType, */ targetScore, answer } = data;

            if (playlist) dispatch(setPlaylist(playlist));
            // if (gameType) dispatch(setGameType(gameType));
            if (targetScore) dispatch(setTargetScore(targetScore));

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
    const handleClickGameStart = () => SocketService.socketEmit("game start");

    return (
        <article className={styles.settingsPanelContainer}>
            <ul className={`${styles.setingBox} ${isManager && styles.setingBoxManager}`} onClick={clickButton}>
                <li className="ellipsis">{gameSetting.playlist}</li>
                {/* <li>
                    듣기시간 : <span>{gameSetting.gameType ? "전부 듣기" : "1초 듣기"}</span>
                </li> */}
                <li>
                    목표점수 : <span>{gameSetting.targetScore}</span>
                </li>
            </ul>

            {isManager && <Button text="게임시작" style={{ width: "80%", height: "40px" }} onClick={handleClickGameStart} />}

            <article style={{ zIndex: 1 }}>{isManager && isSettingBoxModalOpen && <SettingBoxModal isOpen={isSettingBoxModalOpen} onClose={closeSettingBoxModal} />}</article>
        </article>
    );
};

export default SettingsPanel;
