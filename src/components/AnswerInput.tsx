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
    const [isComposing, setIsComposing] = useState(false); // IME 입력 중 여부 추적

    useEffect(() => {
        if (inputRef && inputRef.current) inputRef.current.focus();
        if (inputRef && inputRef.current) inputRef.current.click();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAnswerSubmit = () => {
        if (value.trim()) {
            try {
                SocketService.socketEmit("submit answer", { message: value });
                const hiddenInp = document.createElement("input");
                hiddenInp.setAttribute("type", "text");

                document.body.prepend(hiddenInp);
                hiddenInp.focus();
                hiddenInp.remove();

                if (inputRef.current) inputRef.current?.focus();
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
        if (isComposing) return; // IME 입력 중일 경우 엔터 이벤트 처리하지 않음
        console.log();
        if (e.key === "Enter") {
            e.preventDefault();
            handleAnswerSubmit();
        }
    };

    // IME 입력 시작
    const handleCompositionStart = () => {
        setIsComposing(true);
    };

    // IME 입력 완료
    const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
        setIsComposing(false);
        setValue(e.currentTarget.value); // 최종 입력 값을 업데이트
    };

    return (
        <article className={styles.answerInputContainer}>
            <input
                type="text"
                ref={inputRef}
                value={value}
                className={styles.AnswerInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                onCompositionStart={handleCompositionStart} // IME 입력 시작 이벤트
                onCompositionEnd={handleCompositionEnd} // IME 입력 완료 이벤트
                autoComplete="off"
            />
            <Button text="전송" style={{ width: "80px", height: "100%" }} onClick={handleAnswerSubmit} />
        </article>
    );
};

export default AnswerInput;
