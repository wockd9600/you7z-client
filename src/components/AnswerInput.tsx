import { MutableRefObject, useEffect, useState } from "react";
import Button from "./Common/Button";

import SocketService from "utils/socket";

import styles from "./css/AnswerBox.module.css";

interface AnswerInputProps {
    inputRef: MutableRefObject<HTMLInputElement | null>;
}

const AnswerInput = ({ inputRef }: AnswerInputProps) => {
    // const inputRef = useRef<HTMLInputElement>(null);
    const [value, setValue] = useState("");

    useEffect(() => {
        if (inputRef && inputRef.current) inputRef.current.focus();
        if (inputRef && inputRef.current) inputRef.current.click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnswerSubmit = () => {
        if (inputRef.current) inputRef.current?.focus();
        if (value.trim()) {
            try {
                SocketService.socketEmit("submit answer", { message: value });
                inputRef.current!.value = "";
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
        if (e.nativeEvent.isComposing) return;

        if (e.key === "Enter") {
            e.preventDefault();
            handleAnswerSubmit();
        }
    };

    return (
        <article className={styles.answerInputContainer}>
            <input type="text" ref={inputRef} value={value} className={styles.AnswerInput} onChange={handleChange} onKeyDown={handleKeyDown} />
            <Button text="전송" style={{ width: "80px", height: "100%" }} onClick={handleAnswerSubmit} />
        </article>
    );
};

export default AnswerInput;
