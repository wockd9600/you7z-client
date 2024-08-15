import Button from "./Common/Button";

import styles from "./css/AnswerBox.module.css"

const AnswerInput = () => {
    return (
        <article className={styles.answerInputContainer}>
            <input type="text" className={styles.AnswerInput} />
            <Button text="전송" style={{ width: "60px", height: "100%" }} />
        </article>
    );
};

export default AnswerInput;
