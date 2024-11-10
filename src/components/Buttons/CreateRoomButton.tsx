// 저장한 플리 없으면 생성 불가 isCreate?
import Button from "../Common/Button";
import { useJoinGameRoom } from "hooks/useJoinGameRoom";

const CreateRoomButton = () => {
    const { createGameRoom } = useJoinGameRoom();

    const clickButton = () => createGameRoom();

    return <Button text="방만들기" className="buttonHover" onClick={clickButton} style={{ marginBottom: "16px", fontSize: "39px" }} />;
};

export default CreateRoomButton;
