// 저장한 플리 없으면 생성 불가 isCreate?
import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";

const CreateRoomButton = () => {
    const navigate = useNavigate();

    const clickButton = () => {
        // *수정
        // *server create room
        // 서버에서 체크
        const d = true
        if (!d) {
            // alert
            return alert("저장한 플레이리스가 없습니다.");
        }

        navigate("/910503");
    };

    return <Button text="방만들기" onClick={clickButton} style={{ marginBottom: "16px" }} />;
};

export default CreateRoomButton;
