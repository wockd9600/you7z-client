import { useMemo, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "redux/store";

import styles from "./css/AnswerBox.module.css";

const AnswerList = () => {
    const scrollBoxRef = useRef<HTMLDivElement>(null);
    const { userId } = useSelector((state: RootState) => state.user);
    const { users, answers } = useSelector((state: RootState) => state.game);

    const enrichedAnswers = useMemo(() => {
        const userMap = new Map(users.map((user, index) => [user.userId, { ...user, index }]));

        return answers.map((answer) => {
            const matchingUser = userMap.get(answer.userId);

            let index = 0;
            let nickname = "나간 유저";

            if (matchingUser) {
                nickname = matchingUser.nickname!;
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
        const dom = scrollBoxRef.current;
        if (dom) {
            if (dom.scrollHeight - 100 < dom.scrollTop + dom.offsetHeight) {
                dom.scrollTop = dom.scrollHeight;
            }
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
                                    {item.message.split(/(&_C[^&_C]+&_C)/).map((part, i) =>
                                        part.startsWith("&_C") && part.endsWith("&_C") ? (
                                            <span key={i} style={{ color: "#79EDFF", fontWeight: "bold" }}>
                                                {part.replace(/&_C/g, "")}
                                            </span>
                                        ) : (
                                            part
                                        )
                                    )}
                                </p>
                            ) : (
                                <p key={index} className={styles.answer}>
                                    <span className={`${styles.answerName} user-color${item.index}`}>{item.nickname}: </span>
                                    <span className={`${item.userId === userId ? styles.myText : ""}`}>{item.message}</span>
                                </p>
                            );
                        })}
                </div>
            </div>
        </article>
    );
};

export default AnswerList;
