import { useState } from "react";

import SettingBoxModal from "./Modals/SettingBoxModal";
import styles from "./css/GameBox.module.css";
import Button from "./Common/Button";

const SettingsPanel = () => {
    const settings = {
        playlistName: "2024 노래 모음입니다.",
        type: 0,
        goalSCore: 10,
    };

    const isManager = true;

    const [isSettingBoxModalOpen, setSettingBoxModalOpen] = useState(false);

    const clickButton = () => {
        if (!isManager) return;
        setSettingBoxModalOpen(true);
    };

    const closeSettingBoxModal = () => setSettingBoxModalOpen(false);

    return (
        <article className={styles.settingsPanelContainer}>
            <ul className={`${styles.setingBox} ${isManager && styles.setingBoxManager}`} onClick={clickButton}>
                <li className="ellipsis">{settings.playlistName}</li>
                <li>
                    듣기시간 : <span>{settings.type}</span>
                </li>
                <li>
                    목표점수 : <span>{settings.goalSCore}</span>
                </li>
            </ul>
            {isManager && <Button text="게임시작" style={{ width: "80%", height: "40px" }} />}
            <article style={{ zIndex: 1 }}>{isManager && isSettingBoxModalOpen && <SettingBoxModal isOpen={isSettingBoxModalOpen} onClose={closeSettingBoxModal} />}</article>
        </article>
    );
};

export default SettingsPanel;
