import Button from "../../Common/Button";

const EnterRoomButton = () => {
    const clickButton = () => {
        console.log("click");
    };

    return <Button text="코드입력" onClick={clickButton} />
};

export default EnterRoomButton;