import { useRef } from "react";
import Button from "./Common/Button";

import SocketService from "utils/socket";

import styles from "./css/AnswerBox.module.css";

const AnswerInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleAnswerSubmit = () => {
        if (inputRef.current && inputRef.current.value.trim()) {
            try {
                const message = inputRef.current.value;
                SocketService.socketEmit("submit answer", { message });
                inputRef.current.value = "";
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleAnswerSubmit();
        }
    };

    return (
        <article className={styles.answerInputContainer}>
            <input type="text" ref={inputRef} className={styles.AnswerInput} onInput={handleKeyDown} />
            <Button text="전송" style={{ width: "60px", height: "100%" }} onClick={handleAnswerSubmit} />
        </article>
    );
};

export default AnswerInput;
