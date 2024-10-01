import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setName as setNameRedux } from "../redux/userSlice";
import { patchName } from "../services/userService";

import { handleLogin } from "utils/error";

export const useUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateName = async (name: string) => {
        try {
            if (name.length > 10) throw new Error("닉네임은 최대 10자입니다.");
            await patchName(name);

            localStorage.setItem("nickname", name);

            dispatch(setNameRedux(name));
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
            throw new Error("알 수 없는 오류입니다.");
        }
    };

    return { updateName };
};
