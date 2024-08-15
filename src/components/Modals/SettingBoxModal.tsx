import React, { useState } from "react";

import Modal from "../Common/Modal";

import styles from "./css/BoardTypeModal.module.css";
import Button from "components/Common/Button";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: () => void;
}

const SettingBoxModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const [selectedOption, setSelectedOption] = useState("");

    const options = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
    ];

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    const changeRoomSetting = () => {
        console.log("set");

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <article className={styles.pageButton}></article>
            <div>
                <div className={styles.marginTop}>
                    <label htmlFor="playlist">노래모음</label>
                    <select className={styles.inputStyle} id="playlist" value={selectedOption} onChange={handleChange}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="type">타입</label>
                    <select className={styles.inputStyle} id="type">
                        <option value={1}>전부 듣기</option>
                        <option value={0}>1초 듣기</option>
                    </select>
                    <label htmlFor="goal">목표 점수</label>
                    <select className={styles.inputStyle} id="goal">
                        <option>5</option>
                        <option>10</option>
                        <option>15</option>
                        <option>20</option>
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
