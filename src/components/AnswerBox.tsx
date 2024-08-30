import { CSSProperties, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { addAnswerMessage, setGameSongs, GameAnswer, GameSong, GameUser, updateUserScore } from "../redux/gameSlice";

import AnswerList from "./AnswerList";
import SocketService from "utils/socket";

type SubmitAnswerProps = {
    songResponseData?: GameSong;
    scoreResponseData?: GameUser;
    answerResponseData?: GameAnswer;
};

const AnswerBox = () => {
    const container: CSSProperties = {
        position: "relative",
        height: "100%",
        flex: 1,
        overflow: "auto",
    };

    const dispatch = useDispatch();
    const { roomCode } = useSelector((state: RootState) => state.game);

    useEffect(() => {
        if (!roomCode) return;

        const socket = SocketService.getInstance(roomCode);

        const handleSubmitAnswer = (data: SubmitAnswerProps) => {
            const { songResponseData, scoreResponseData, answerResponseData } = data;
            if (songResponseData) dispatch(setGameSongs(songResponseData));
            if (scoreResponseData) dispatch(updateUserScore({ ...scoreResponseData }));
            if (answerResponseData) dispatch(addAnswerMessage(answerResponseData));
        };

        socket.on("submit answer", handleSubmitAnswer);

        return () => {
            socket.off("submit answer");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomCode]);

    return (
        <article style={container}>
            <AnswerList />
        </article>
    );
};

export default AnswerBox;
