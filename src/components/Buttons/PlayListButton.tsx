import { useState } from "react";

import Button from "../Common/Button";
import PlaylistModal from "../Modals/PlaylistModal";

const PlayListButton = () => {
    const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);

    const clickButton = () => {
        setPlaylistModalOpen(true);
    };

    const closeSetNameModal = () => setPlaylistModalOpen(false);

    return (
        <article>
            <Button text="노래모음" onClick={clickButton} />
            <article>{isPlaylistModalOpen && <PlaylistModal isOpen={isPlaylistModalOpen} onClose={closeSetNameModal} />}</article>
        </article>
    );
};

export default PlayListButton;
