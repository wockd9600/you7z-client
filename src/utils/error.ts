import { Dispatch } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

import { logout } from "../redux/userSlice";

type handleLoginType = {
    error: any;
    dispatch?: Dispatch;
    navigate?: NavigateFunction;
    to?: string;
};

export const handleLogin = (arg: handleLoginType) => {
    const { error, dispatch, navigate, to } = arg;
    const toUrl = to ? to : "/";

    if (error && error.status && error.status === 419) {
        if (dispatch) {
            dispatch(logout());
        }
        if (navigate) navigate(toUrl);

        if (error && error.data && error.data.message) {
            return alert(error.data.message);
        }
    }
    if (error && error.data && error.data.message) {
        alert(error.data.message);
    }
};
