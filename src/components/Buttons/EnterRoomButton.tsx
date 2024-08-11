import { useState } from "react";

import Button from "../Common/Button";
import InputCodeModal from "../Modals/InputCodeModal";

const EnterRoomButton = () => {
    const [isInputCodeModalOpen, setInputCodeModalOpen] = useState(false);

    const clickButton = () => {
        setInputCodeModalOpen(true);
    };
    
    const closeSetNameModal = () => setInputCodeModalOpen(false);

    return (
        <article>
            <Button text="코드입력" onClick={clickButton} />
            <article>{isInputCodeModalOpen && <InputCodeModal isOpen={isInputCodeModalOpen} onClose={closeSetNameModal} />}</article>
        </article>
    );
};

export default EnterRoomButton;
