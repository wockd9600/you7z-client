import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { getPopularPlaylists, postStorePlaylist, deleteStorePlaylist } from "../services/playlistService";
import { Playlist } from "types";

import { handleLogin } from "utils/error";

export const usePlaylist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const getPlaylists = async (page: number, type: number) => {
        try {
            const { playlists } = await getPopularPlaylists(page, type);
            setPlaylists(playlists);
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
        }
    };

    const storePlaylist = async (id: number) => {
        try {
            await postStorePlaylist(id);
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
        }
    };

    const cancelStorePlaylist = async (id: number) => {
        try {
            await deleteStorePlaylist(id);
            const newPlaylist = playlists.filter((playlist) => playlist.id !== id);
            setPlaylists(newPlaylist);
            console.log(newPlaylist);
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
        }
    };

    return { playlists, getPlaylists, setPlaylists, storePlaylist, cancelStorePlaylist };
};
