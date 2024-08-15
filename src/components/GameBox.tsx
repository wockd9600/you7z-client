import { useState } from "react";
import SettingsPanel from "./SettingsPanel";
import UserPanel from "./UserPanel";
import ScoreBoardModal from "components/Modals/ScoreBoardModal";

import styles from "./css/GameBox.module.css";
import Icon from "./Icon";
import Button from "./Common/Button";

const GameBox = () => {
    const [isScoreBoardModalOpen, setScoreBoardModalOpen] = useState(false);
    let gameFinish = true;
    let gameStart = false;

    const clickButton = () => {
        setScoreBoardModalOpen(true);
    };

    const closeScoreBoardModal = () => setScoreBoardModalOpen(false);

    return (
        <section>
            <article className={styles.container}>
                <UserPanel />

                {!gameStart ? (
                    <SettingsPanel />
                ) : (
                    <article className={`${styles.settingsPanelContainer} ${styles.musicContainer}`}>
                        <div className={styles.iconContainer}>
                            <Icon name="music" />
                            <div className={styles.vibration}></div>
                        </div>
                        <Button text="넘기기" style={{ width: "80%", height: "40px" }} />
                    </article>
                )}
                {/* <Button text="노래모음 만들기" onClick={clickButton} style={{ marginBottom: "16px" }} /> */}
                {gameFinish && (
                    <article style={{ zIndex: 2 }}>
                        {" "}
                        <ScoreBoardModal isOpen={isScoreBoardModalOpen} onClose={closeScoreBoardModal} />
                    </article>
                )}
            </article>
        </section>
    );
};

export default GameBox;
