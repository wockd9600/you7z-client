import { useState } from "react";

import Button from "components/Common/Button";
import AddedSongsModal from "./AddedSongsModal";

import styles from "../css/BoardTypeModal.module.css";

import { Song } from "types";

interface CreatePlaylistModalHeaderProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    songs: Song[];
    createPlaylist: () => void;
}

const CreatePlaylistModalHeader = ({ songs, createPlaylist }: CreatePlaylistModalHeaderProps) => {
    const [addedSongsModalOpen, setAddedSongsModalOpen] = useState(false);

    const clickButton = () => {
        setAddedSongsModalOpen(true);
    };

    const closeAddedSongsModal = () => setAddedSongsModalOpen(false);

    return (
        <article>
            <div className={styles.createPlaylistButtonContainer}>
                <Button text="목록" className={styles.createPlaylistButton} style={{ width: "50px", height: "100%", padding: "0px" }} onClick={clickButton}></Button>
                {/* <Button text="초기화" className={styles.createPlaylistButton} style={{ width: "60px", height: "100%" }} onClick={createPlaylist}></Button> */}
                <Button text="만들기" className={styles.createPlaylistButton} style={{ width: "60px", height: "100%", padding: "0px" }} onClick={createPlaylist}></Button>
            </div>
            {addedSongsModalOpen && <AddedSongsModal isOpen={addedSongsModalOpen} onClose={closeAddedSongsModal} songs={songs} />}
        </article>
    );
};

export default CreatePlaylistModalHeader;
