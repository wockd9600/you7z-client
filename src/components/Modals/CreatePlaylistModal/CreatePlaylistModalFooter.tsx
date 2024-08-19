import Button from "components/Common/Button";

import styles from "../css/BoardTypeModal.module.css";

interface CreatePlaylistModalFooterProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    page: number;
    songsLength: number;
    handleAddSong: () => void;
    handleDeleteSong: () => void;
}

const CreatePlaylistModalFooter = ({ page, songsLength, handleAddSong, handleDeleteSong }: CreatePlaylistModalFooterProps) => {
    return (
        <article>
            <div className={styles.marginTop} style={{ display: "flex", justifyContent: "space-around" }}>
                <div className={page !== songsLength ? styles.invisible : ""}>
                    <Button text="노래 추가" onClick={handleAddSong}></Button>
                </div>
                <Button text="노래 삭제" onClick={handleDeleteSong}></Button>
            </div>
        </article>
    );
};

export default CreatePlaylistModalFooter;
