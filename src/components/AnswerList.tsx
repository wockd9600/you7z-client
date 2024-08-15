import styles from "./css/AnswerBox.module.css";

const AnswerList = () => {
    const answers = [
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴsadjflkasjdflkdjsakfjslf딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
        { order: 1, name: "안녕하세요 저예요", answer: "???" },
        { order: 2, name: "그렇습니까?", answer: "따나ㄸㄴ딴단" },
    ];
    return (
        <article className={styles.answerListContainer}>
            <div className={styles.answerListBox}>
                <div className={styles.answers}>
                    {answers.map((item, index) => {
                        return (
                            <p key={index} className={styles.answer}>
                                <span className={`${styles.answerName} user-color${item.order}`}>{item.name}</span> : {item.answer}
                            </p>
                        );
                    })}
                </div>
            </div>
        </article>
    );
};

export default AnswerList;
