import { useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import styles from "./css/AnswerBox.module.css";

const AnswerList = () => {
    const scrollBoxRef = useRef<HTMLDivElement>(null);
    const { users, answers } = useSelector((state: RootState) => state.game);

    const enrichedAnswers = useMemo(() => {
        const userMap = new Map(users.map((user, index) => [user.userId, { ...user, index }]));

        return answers.map((answer) => {
            const matchingUser = userMap.get(answer.userId);
            
            let index = 0;
            let nickname = "나간 유저";

            if (matchingUser) {
                nickname = matchingUser.nickname;
                index = matchingUser.index + 1;
            }

            return {
                ...answer,
                index,
                nickname,
            };
        });
    }, [users, answers]);

    useEffect(() => {
        if (scrollBoxRef.current) {
            scrollBoxRef.current.scrollTop = scrollBoxRef.current.scrollHeight;
        }
    }, [enrichedAnswers]);

    return (
        <article className={styles.answerListContainer}>
            <div className={styles.answerListBox} ref={scrollBoxRef}>
                <div className={styles.answers}>
                    {enrichedAnswers &&
                        enrichedAnswers.map((item, index) => {
                            return item.isAlert ? (
                                <p key={index} className={`${styles.answer} alert-color`}>
                                    {item.message}
                                </p>
                            ) : (
                                <p key={index} className={styles.answer}>
                                    <span className={`${styles.answerName} user-color${item.index}`}>{item.nickname}</span> : {item.message}
                                </p>
                            );
                        })}
                </div>
            </div>
        </article>
    );
};

export default AnswerList;
