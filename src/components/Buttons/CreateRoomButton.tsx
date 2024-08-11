// 저장한 플리 없으면 생성 불가 isCreate?

import Button from "../Common/Button";

const CreateRoomButton = () => {
    const isCreate = false;

    const clickButton = () => {
        if (!isCreate) {
            // alert
            return console.log("노래모음을 담아주세요")
        }
        // *수정
        console.log("create");

        // route = /room_code
    };

    return <Button text="방만들기" onClick={clickButton} />
};

export default CreateRoomButton;