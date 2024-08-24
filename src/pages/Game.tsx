import { CSSProperties, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AnswerBox from "components/AnswerBox";
import GameBox from "components/GameBox";
import GameHeader from "components/GameHeader";
import AnswerInput from "components/AnswerInput";

import { useGameRoom } from "hooks/useGameRoom";

const Game = () => {
    const gameContainer: CSSProperties = {
        position: "relative",
        height: "100%",
        display: "flex",
        flexDirection: "column",
    };

    const navigator = useNavigate();
    const { roomCode } = useParams();
    const { getGameRoomInfo } = useGameRoom();

    // 서버에서 방 정보를 가져온 뒤
    // redux에 넣는다.

    useEffect(() => {
        if (!roomCode) {
            navigator("/");
            return;
        }

        getGameRoomInfo(roomCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
