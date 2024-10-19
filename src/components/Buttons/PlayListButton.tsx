import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "redux/store";
import { setTempGameSetting } from "../../redux/gameSlice";

import Button from "../Common/Button";
import PlaylistModal from "../Modals/PlaylistModal";

import { PlaylistModalType } from "constants/enums";

const PlayListButton = () => {
    const dispatch = useDispatch();

    const [isPlaylistModalOpen, setPlaylistModalOpen] = useState(false);
    const { gameSetting, tempGameSetting } = useSelector((state: RootState) => state.game);

    useEffect(() => {
        const { playlist_id, title } = gameSetting;
        dispatch(setTempGameSetting({ playlist_id, title }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const clickButton = () => {
        setPlaylistModalOpen(true);
    };

    const closeSetNameModal = () => setPlaylistModalOpen(false);

    return (
        <article>
            <Button text={tempGameSetting.title || ""} onClick={clickButton} style={{ width: "100%", height: "40px", marginBottom: "16px", paddingLeft: "8px", fontSize: "16px", boxSizing: "border-box", textAlign: "start", backgroundColor: "#fff" }}></Button>

            <article>{isPlaylistModalOpen && <PlaylistModal isOpen={isPlaylistModalOpen} onClose={closeSetNameModal} modalType={PlaylistModalType.POPULAR} />}</article>
        </article>
    );
};

export default PlayListButton;
