import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useState } from "react";
import { getPopularPlaylists } from "../services/playlistService";
import { Playlist } from "types";

import { handleLogin } from "utils/error";

export const usePlaylist = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const getPlaylists = async (page: number, type: number, search_term = "") => {
        try {
            const { playlists } = await getPopularPlaylists(page, type, search_term);
            setPlaylists(playlists);
        } catch (error) {
            handleLogin({ error, dispatch, navigate });
        }
    };

    return { playlists, getPlaylists, setPlaylists };
};
