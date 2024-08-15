import { CSSProperties } from "react";

import AnswerBox from "components/AnswerBox";
import GameBox from "components/GameBox";
import GameHeader from "components/GameHeader";
import AnswerInput from "components/AnswerInput";

const Game = () => {
    const gameContainer: CSSProperties = {
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    };

    const gmaeInfo = {
        adf: "asdf",
    };
    console.log(gmaeInfo);

    return (
        <section style={gameContainer}>
            <GameHeader />
            <GameBox />
            <AnswerBox />
            <AnswerInput />
        </section>
    );
};

export default Game;
