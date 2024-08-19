// 저장한 플리 없으면 생성 불가 isCreate?
import { useState } from "react";

import Button from "../Common/Button";
import CreatePlaylistModal from "../Modals/CreatePlaylistModal/CreatePlaylistModal";

const CreateRoomButton = () => {
    const [isInputCodeModalOpen, setInputCodeModalOpen] = useState(false);

    const clickButton = () => {
        setInputCodeModalOpen(true);
    };

    const closeSetNameModal = () => setInputCodeModalOpen(false);

    return (
        <article>
            <Button text="노래모음 만들기" onClick={clickButton} style={{ marginBottom: "16px" }} />
            <article>{isInputCodeModalOpen && <CreatePlaylistModal isOpen={isInputCodeModalOpen} onClose={closeSetNameModal} />}</article>
        </article>
    );
};

export default CreateRoomButton;
