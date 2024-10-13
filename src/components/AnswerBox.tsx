import { CSSProperties, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "redux/store";
import { addAnswerMessage, GameAnswer, GameUser, updateUserInfo } from "../redux/gameSlice";
import { GameSong } from "../redux/songSlice";

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
        width: "100%",
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
            const { answerSongResponseData, scoreResponseData, answerResponseData } = data;

            if (answerResponseData) dispatch(addAnswerMessage(answerResponseData));
            if (answerSongResponseData) {
                const answer = { id: 0, isAlert: true, userId: 0, message: `정답은 &_C${answerSongResponseData.answer}&_C 입니다.` };
                dispatch(addAnswerMessage(answer));
                if (answerSongResponseData.description.length !== 0) {
                    const description = { id: 0, isAlert: true, userId: 0, message: `${answerSongResponseData.description}` };
                    dispatch(addAnswerMessage(description));
                }
                localStorage.setItem("GameStatus", GameStatus.IS_WAITING.toString());
            }
            // if (songResponseData) {
            //     localStorage.setItem("GameStatus", GameStatus.IS_WAITING.toString());
            //     dispatch(setGameSong(songResponseData));
            // }
            if (scoreResponseData) dispatch(updateUserInfo({ ...scoreResponseData }));
        };

        const handleShowAnswer = (data: any) => {
            const { answerSongResponseData } = data;
            if (answerSongResponseData) {
                const answer = { id: 0, isAlert: true, userId: 0, message: `정답은 &_C${answerSongResponseData.answer}&_C 입니다.` };
                dispatch(addAnswerMessage(answer));
                const description = { id: 0, isAlert: true, userId: 0, message: `${answerSongResponseData.description}` };
                dispatch(addAnswerMessage(description));
            }
        };

        socket.on("submit answer", handleSubmitAnswer);
        socket.on("show answer", handleShowAnswer);

        return () => {
            socket.off("submit answer");
            socket.off("show answer");
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
