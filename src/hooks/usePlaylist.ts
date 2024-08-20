import { useState } from "react";
import { getPopularPlaylists, postStorePlaylist } from "../services/playlistService";
import { Playlist } from "types";

export const usePlaylist = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const popularPlaylists = async (page: number) => {
        try {
            const { playlists } = await getPopularPlaylists(page);
            setPlaylists(playlists);
        } catch (error) {
            console.log(error);
        }
    };

    const storePlaylist = async (id: number) => {
        try {
            await postStorePlaylist(id);
        } catch (error) {
            console.log(error);
        }
    };

    return { playlists, setPlaylists, storePlaylist, popularPlaylists };
};
