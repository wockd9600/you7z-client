import { useState } from "react";

import Button from "../Common/Button";
import EnterRoomModal from "../Modals/EnterRoomModal";

const EnterRoomButton = () => {
    const [isEnterRoomModalOpen, setEnterRoomModalOpen] = useState(false);

    const clickButton = () => {
        setEnterRoomModalOpen(true);
    };

    const closeSetNameModal = () => setEnterRoomModalOpen(false);

    return (
        <article>
            <Button text="코드입력" className="buttonHover" onClick={clickButton} style={{ marginBottom: "16px", fontSize: "39px" }} />
            <article>{isEnterRoomModalOpen && <EnterRoomModal isOpen={isEnterRoomModalOpen} onClose={closeSetNameModal} />}</article>
        </article>
    );
};

export default EnterRoomButton;
