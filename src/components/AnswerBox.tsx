import { CSSProperties, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { addAnswerMessage, GameAnswer, GameUser, updateUserScore } from "../redux/gameSlice";
import { setGameSong, GameSong } from "../redux/songSlice";

import AnswerList from "./AnswerList";
import SocketService from "utils/socket";

import { GameStatus } from "constants/enums";

type SubmitAnswerProps = {
    answerSongResponseData?: { answer: string; description: string };
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
            const { answerSongResponseData, songResponseData, scoreResponseData, answerResponseData } = data;

            if (answerResponseData) dispatch(addAnswerMessage(answerResponseData));
            if (answerSongResponseData) {
                const answer = { id: 0, isAlert: true, userId: 0, message: `정답은 "${answerSongResponseData.answer}" 입니다.` };
                dispatch(addAnswerMessage(answer));
                const description = { id: 0, isAlert: true, userId: 0, message: `${answerSongResponseData.description}` };
                dispatch(addAnswerMessage(description));
            }
            if (songResponseData) {
                localStorage.setItem("GameStatus", GameStatus.IS_WAITING.toString());
                dispatch(setGameSong(songResponseData));
            }
            if (scoreResponseData) dispatch(updateUserScore({ ...scoreResponseData }));
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
