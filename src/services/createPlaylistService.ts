import axios from "../utils/axios";
import { Song } from "types";

export const checkYoutubeLink = async (url: string) => {
    try {
        const response = await axios.post("/playlist/checkYoutubeLink", { url });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createPlaylist = async (
    playlist: {
        title: string;
        description: string;
    },
    songs: Song[]
) => {
    try {
        await axios.post("/playlist/create", { playlist, songs });
    } catch (error) {
        throw error;
    }
};
