import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// User 타입 정의
export interface GameUser {
    userId: number;
    order: number;
    nickname: string;
    score: number;
}

// ChatMessage 타입 정의
export interface GameAnswer {
    id: number;
    userId: number;
    nickname: string;
    message: string;
}

export interface GameSetting {
    playlist: string;
    gameType: string;
    targetScore: number;
}

// GameState 타입 정의
export interface GameState {
    status: number;
    roomCode: string;
    gameSetting: GameSetting;
    users: GameUser[];
    answers: GameAnswer[];
}

// Initial state for the game
const initialState: GameState = {
    status: 0,
    roomCode: "",
    gameSetting: { playlist: "", gameType: "", targetScore: 0 },
    users: [],
    answers: [],
};

export const gameSlice = createSlice({
    name: "game",
    initialState,
    reducers: {
        setStatus: (state, action: PayloadAction<number>) => {
            state.status = action.payload;
        },
        setRoomCode: (state, action: PayloadAction<string>) => {
            state.roomCode = action.payload;
        },
        setPlaylist: (state, action: PayloadAction<string>) => {
            state.gameSetting.playlist = action.payload;
        },
        setGameType: (state, action: PayloadAction<string>) => {
            state.gameSetting.gameType = action.payload;
        },
        setTargetScore: (state, action: PayloadAction<number>) => {
            state.gameSetting.targetScore = action.payload;
        },
        addUser: (state, action: PayloadAction<Omit<GameUser, "score">>) => {
            state.users.push({ ...action.payload, score: 0 });
        },
        updateUserScore: (state, action: PayloadAction<{ userId: number; score: number }>) => {
            const user = state.users.find((u) => u.userId === action.payload.userId);
            if (user) {
                user.score = action.payload.score;
            }
        },
        removeUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((u) => u.userId !== action.payload);
        },
        addAnswerMessage: (state, action: PayloadAction<GameAnswer>) => {
            state.answers.push(action.payload);
        },
        setGameState: (state, action: PayloadAction<GameState>) => {
            return action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setStatus, setRoomCode, setPlaylist, setGameType, setTargetScore, addUser, updateUserScore, removeUser, addAnswerMessage, setGameState } = gameSlice.actions;

export default gameSlice.reducer;
