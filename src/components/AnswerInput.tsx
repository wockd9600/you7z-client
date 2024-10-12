import { useRef, useState } from "react";
import Button from "./Common/Button";

import SocketService from "utils/socket";

import styles from "./css/AnswerBox.module.css";

const AnswerInput = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");

    const handleAnswerSubmit = () => {
        if (value.trim()) {
            try {
                SocketService.socketEmit("submit answer", { message: value });
                setValue("");
            } catch (error) {
                console.log(error);
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };

    // 키 입력 이벤트 핸들러 추가
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing) {
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            if (inputRef.current) inputRef.current?.focus();
            handleAnswerSubmit();
        }
    };

    return (
        <article className={styles.answerInputContainer}>
            <input type="text" ref={inputRef} value={value} className={styles.AnswerInput} onChange={handleChange} onKeyDown={handleKeyDown} />
            <Button text="전송" style={{ width: "60px", height: "100%" }} onClick={handleAnswerSubmit} />
        </article>
    );
};

export default AnswerInput;
