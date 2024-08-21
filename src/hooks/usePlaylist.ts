import { useState } from "react";
import { getPopularPlaylists, postStorePlaylist, deleteStorePlaylist } from "../services/playlistService";
import { Playlist } from "types";

export const usePlaylist = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);

    const getPlaylists = async (page: number, type: number) => {
        try {
            const { playlists } = await getPopularPlaylists(page, type);
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

    const cancelStorePlaylist = async (id: number) => {
        try {
            await deleteStorePlaylist(id);
            const newPlaylist = playlists.filter((playlist) => playlist.id !== id);
            setPlaylists(newPlaylist);
            console.log(newPlaylist)
        } catch (error) {
            console.log(error);
        }
    };

    return { playlists, getPlaylists, setPlaylists, storePlaylist, cancelStorePlaylist };
};
