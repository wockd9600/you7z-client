import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import SettingBoxModal from "./Modals/SettingBoxModal";
import Button from "./Common/Button";

import styles from "./css/GameBox.module.css";

const SettingsPanel = () => {
    const [isSettingBoxModalOpen, setSettingBoxModalOpen] = useState(false);

    const gameSetting = useSelector((state: RootState) => state.game.gameSetting);
    const isManager = true;

    const clickButton = () => {
        if (!isManager) return;
        setSettingBoxModalOpen(true);
    };

    const closeSettingBoxModal = () => setSettingBoxModalOpen(false);

    return (
        <article className={styles.settingsPanelContainer}>
            <ul className={`${styles.setingBox} ${isManager && styles.setingBoxManager}`} onClick={clickButton}>
                <li className="ellipsis">{gameSetting.playlist}</li>
                <li>
                    듣기시간 : <span>{gameSetting.gameType ? "전부 듣기" : "1초 듣기"}</span>
                </li>
                <li>
                    목표점수 : <span>{gameSetting.targetScore}</span>
                </li>
            </ul>
            {isManager && <Button text="게임시작" style={{ width: "80%", height: "40px" }} />}
            <article style={{ zIndex: 1 }}>{isManager && isSettingBoxModalOpen && <SettingBoxModal isOpen={isSettingBoxModalOpen} onClose={closeSettingBoxModal} />}</article>
        </article>
    );
};

export default SettingsPanel;
