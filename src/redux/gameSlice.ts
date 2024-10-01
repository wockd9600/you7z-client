import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// User 타입 정의
export interface GameUser {
    userId: number;
    status?: number;
    order?: number;
    nickname?: string;
    score?: number;
    isReady?: boolean;
}

// ChatMessage 타입 정의
export interface GameAnswer {
    id: number;
    isAlert?: boolean;
    userId: number;
    message: string;
}

export interface GameSetting {
    playlist: string;
    description: string;
    // gameType: number;
    targetScore: number;
}

// GameState 타입 정의
export interface GameState {
    status: number;
    roomCode: string;
    managerId: number;
    gameSetting: GameSetting;
    users: GameUser[];
    answers: GameAnswer[];
}

// Initial state for the game
const initialState: GameState = {
    status: -1,
    roomCode: "",
    managerId: -1,
    gameSetting: { playlist: "", description: "", /* gameType: 0, */ targetScore: 0 },
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
        setManagerId: (state, action: PayloadAction<number>) => {
            state.managerId = action.payload;
        },
        setPlaylist: (state, action: PayloadAction<string>) => {
            state.gameSetting.playlist = action.payload;
        },
        setDescription: (state, action: PayloadAction<string>) => {
            state.gameSetting.description = action.payload;
        },
        // setGameType: (state, action: PayloadAction<number>) => {
        //     state.gameSetting.gameType = action.payload;
        // },
        setTargetScore: (state, action: PayloadAction<number>) => {
            state.gameSetting.targetScore = action.payload;
        },
        setAnswers: (state, action: PayloadAction<GameAnswer[]>) => {
            state.answers = action.payload;
        },
        setGameState: (state, action: PayloadAction<GameState>) => {
            return action.payload;
        },
        resetGameState: () => {
            return initialState;
        },

        addUser: (state, action: PayloadAction<Omit<GameUser, "score">>) => {
            state.users = [...state.users, { ...action.payload, isReady: true, score: 0 }];
        },
        addAnswerMessage: (state, action: PayloadAction<GameAnswer>) => {
            state.answers.push(action.payload);
        },

        updateUserInfo: (state, action: PayloadAction<GameUser>) => {
            const { userId, nickname, status, score, isReady } = action.payload;
            const user = state.users.find((u) => u.userId === userId);
            if (user) {
                if (typeof nickname === "string") {
                    user.nickname = nickname;
                } else if (typeof score === "number") {
                    user.score = score;
                } else if (typeof status === "number") {
                    user.status = status;
                } else if (typeof isReady === "boolean") {
                    user.isReady = isReady;
                }
            }
        },

        removeUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((u) => u.userId !== action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { setStatus, setRoomCode, setManagerId, setPlaylist, setDescription, /* setGameType, */ setTargetScore, setAnswers, addUser, updateUserInfo, removeUser, addAnswerMessage, setGameState, resetGameState } = gameSlice.actions;

export default gameSlice.reducer;
