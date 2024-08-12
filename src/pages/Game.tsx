import AnswerBox from "components/AnswerBox";
import GameBox from "components/GameBox";
import GameHeader from "components/GameHeader";

const Game = () => {
    return (
        <section>
            <GameHeader />
            <GameBox />
            <AnswerBox />
        </section>
    );
};

export default Game;
