import { useDispatch } from "react-redux";
import { setName as setNameRedux } from "../redux/userSlice";
import { patchName } from "../services/userService";

export const useUser = () => {
    const dispatch = useDispatch();

    const updateName = async (name: string) => {
        try {
            if (name.length > 10) throw new Error("닉네임은 최대 10자입니다.");
            await patchName(name);

            localStorage.setItem("nickname", name);

            dispatch(setNameRedux(name));
        } catch (error) {
            if (error instanceof Error) throw new Error(error.message);
            throw new Error("알 수 없는 오류입니다.");
        }
    };

    return { updateName };
};
