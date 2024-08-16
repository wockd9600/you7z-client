import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    isLogin?: boolean;
    name: string;
}

const initialState: UserState = {
    isLogin: false,
    name: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            return { ...state, ...action.payload, isLogin: true };
        },
        logout: () => initialState,
        setIsLogin: (state, action: PayloadAction<boolean>) => {
            state.isLogin = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, logout, setName, setIsLogin } = userSlice.actions;

export default userSlice.reducer;
