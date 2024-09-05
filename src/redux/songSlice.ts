import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// User 타입 정의
export interface GameSong {
    id: number | null;
    url: string | null;
    startTime: number;
    description: string;
}

// GameState 타입 정의
export interface SongState {
    song1: GameSong;
    song2: GameSong;
    songIndex: 0 | 1;
}

// Initial state for the game
const initialState: SongState = {
    song1: { id: null, url: null, startTime: 0, description: "" },
    song2: { id: null, url: null, startTime: 0, description: "" },

    songIndex: 0,
};

export const songSlice = createSlice({
    name: "song",
    initialState,
    reducers: {
        setGameSong: (state, action: PayloadAction<GameSong>) => {
            if (state.songIndex === 0) state.song1 = action.payload;
            else state.song2 = action.payload;
        },
        setGameSongIndex: (state) => {
            state.songIndex = state.songIndex === 1 ? 0 : 1;
        },
        resetSongState: () => {
            return initialState;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setGameSong, setGameSongIndex } = songSlice.actions;

export default songSlice.reducer;
