import { CSSProperties } from "react";

import AnswerList from "./AnswerList";

const AnswerBox = () => {
    const container: CSSProperties = {
        position: "relative",
        height: "100%",
        flex: 1,
        overflow: "auto",
    };
    return (
        <article style={container}>
            <AnswerList />
        </article>
    );
};

export default AnswerBox;
