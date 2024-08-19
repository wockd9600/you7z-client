// usePlaylist.ts
import { useState, useCallback } from "react";
import { Song, VideoData } from "types";

import { getYoutubeVideoId, formatDuration, checkSongFormData } from "../components/Modals/CreatePlaylistModal/helpers";
import { checkYoutubeLink, createPlaylist as createPlaylistServer } from "services/createPlaylistService";

const useSongs = () => {
    const [songs, setSongs] = useState<Song[]>([]);

    const updateSong = useCallback(
        (index: number, song: Song) => {
            const newSongs = [...songs];
            newSongs[index] = song;
            sessionStorage.setItem("cp-songs", JSON.stringify(newSongs));
            setSongs(newSongs);
        },
        [songs]
    );

    const addSong = useCallback(
        (song: Song) => {
            const newSongs = [...songs, song];
            sessionStorage.setItem("cp-songs", JSON.stringify(newSongs));
            setSongs(newSongs);
        },
        [songs]
    );

    const deleteSong = useCallback(
        (index: number) => {
            const newSongs = songs.filter((_, i) => i !== index);
            sessionStorage.setItem("cp-songs", JSON.stringify(newSongs));
            setSongs(newSongs);
        },
        [songs]
    );

    return { songs, updateSong, addSong, deleteSong, setSongs };
};

const usePage = () => {
    const [page, setPage] = useState(-1);

    const nextPage = useCallback(() => setPage((prev) => prev + 1), []);
    const prevPage = useCallback(() => setPage((prev) => Math.max(prev - 1, 0)), []);
    const goToPage = useCallback((newPage: number) => setPage(newPage), []);

    return { page, setPage, nextPage, prevPage, goToPage };
};

const useVideo = () => {
    const [videoDatas, setVideoDatas] = useState<VideoData[]>([]);

    const [videoExists, setVideoExists] = useState(0);
    const [isAnswer, setIsAnswer] = useState(false);
    const [videoTitle, setVideoTitle] = useState("");
    const [videoDuration, setVideoDuration] = useState("");
    const [videoThumbnail, setVideoThumbnail] = useState("");
    const [time, setTime] = useState("00:00:00");

    const getVideoData = useCallback(() => {
        return {
            title: videoTitle,
            duration: videoDuration,
            thumbnail: videoThumbnail,
        };
    }, [videoDuration, videoThumbnail, videoTitle]);

    const updateVideoData = useCallback(
        (index: number) => {
            const newVideoDatas = [...videoDatas];
            newVideoDatas[index] = getVideoData();
            sessionStorage.setItem("cp-yds", JSON.stringify(newVideoDatas));
            setVideoDatas(newVideoDatas);
        },
        [getVideoData, videoDatas]
    );

    const addVideoData = useCallback(() => {
        const newVideoDatas = [...videoDatas, getVideoData()];
        sessionStorage.setItem("cp-yds", JSON.stringify(newVideoDatas));
        setVideoDatas(newVideoDatas);
    }, [getVideoData, videoDatas]);

    const deleteVideoData = useCallback(
        (index: number) => {
            const newVideoDatas = videoDatas.filter((_, i) => i !== index);
            sessionStorage.setItem("cp-yds", JSON.stringify(newVideoDatas));
            setVideoDatas(newVideoDatas);
        },
        [videoDatas]
    );

    const initYoubeData = useCallback(
        (page: number) => {
            if (!videoDatas[page]) return;

            const { title, duration, thumbnail } = videoDatas[page];
            if (title && duration && thumbnail) {
                setVideoExists(1);
                setVideoTitle(title);
                setVideoDuration(duration);
                setVideoThumbnail(thumbnail);
            }
        },
        [videoDatas]
    );

    const resetSongState = useCallback(() => {
        setVideoExists(0);
        setVideoTitle("");
        setVideoDuration("");
        setVideoThumbnail("");
        setIsAnswer(false);
    }, []);

    const handleCheckVideo = async (url: string | undefined) => {
        if (!url) return;

        const videoId = getYoutubeVideoId(url);

        try {
            if (!videoId) throw Error("don't exist the video");
            const videoData = await checkYoutubeLink(url);
            // const videoData = {
            //     duration: "PT13M5S",
            //     thumbnails: { url: "https://i.ytimg.com/vi/ouAhRLnXflA/sddefault.jpg", width: 640, height: 480 },
            //     title: "롤드컵 역대 우승 순간 (2011 ~ 2023)",
            // };

            if (videoData) {
                setVideoExists(1);
                const duration = formatDuration(videoData.duration);
                setVideoTitle(videoData.title);
                setVideoDuration(duration || "");
                setVideoThumbnail(videoData.thumbnails.url);
            } else {
                setVideoExists(2);
            }
        } catch (error) {
            setVideoExists(2);
            setVideoTitle("");
            setVideoDuration("");
            setVideoThumbnail("");
        }
    };

    const validationAddSong = useCallback(
        (youtubeLinkValue: string, answerValue: string) => {
            if (!youtubeLinkValue) {
                setVideoExists(2);
            } else if (!videoDuration) {
                setVideoExists(3);
            } else if (!answerValue) {
                setIsAnswer(true);
            } else {
                setIsAnswer(false);
                setVideoExists(0);
                setVideoTitle("");
                setVideoDuration("");
                setVideoThumbnail("");
                return true;
            }

            return false;
        },
        [videoDuration]
    );

    return {
        videoDatas,
        setVideoDatas,
        updateVideoData,
        addVideoData,
        deleteVideoData,
        videoData: {
            videoExists,
            isAnswer,
            videoTitle,
            videoDuration,
            videoThumbnail,
            time,
            setTime,
        },
        initYoubeData,
        resetSongState,
        handleCheckVideo,
        validationAddSong,
    };
};

const useCreatePlaylist = () => {
    const { songs, updateSong, addSong, deleteSong, setSongs } = useSongs();
    const { page, nextPage, prevPage, goToPage } = usePage();
    const { videoData, setVideoDatas, updateVideoData, addVideoData, deleteVideoData, initYoubeData, resetSongState, handleCheckVideo, validationAddSong } = useVideo();

    const [playlistTitle, setPlaylistTitle] = useState("");
    const [playlistDescription, setPlaylistDescription] = useState("");

    const createPlaylist = async () => {
        if (songs.length < 5) {
            alert("노래는 최소 5개 이상이어야 합니다.");
        }

        if (!playlistTitle) {
            alert("플레이리스트 제목이 없습니다.");
            goToPage(0);
            return;
        } else if (!playlistDescription) {
            alert("플레이리스트 설명이 없습니다.");
            goToPage(0);
            return;
        }

        try {
            songs.forEach((item, index) => {
                const result = checkSongFormData(item);
                if (!result) throw new Error(`invalid song of ${index}page`);
            });

            const playlist = { title: playlistTitle, description: playlistDescription };
            await createPlaylistServer(playlist, songs);

            setPlaylistTitle("");
            setPlaylistDescription("");

            sessionStorage.removeItem("cp-yds");
            sessionStorage.removeItem("cp-songs");
            sessionStorage.removeItem("cp-p-description");
            sessionStorage.removeItem("cp-p-title");

            setSongs([]);
            setVideoDatas([]);
            alert("만들기 완료!");
        } catch (error) {
            console.log(error);
        }
    };

    return {
        page,
        nextPage,
        prevPage,
        goToPage,
        playlistTitle,
        playlistDescription,
        setPlaylistTitle,
        setPlaylistDescription,
        createPlaylist,
        songs,
        setSongs,
        updateSong,
        addSong,
        deleteSong,
        videoData,
        updateVideoData,
        addVideoData,
        deleteVideoData,
        setVideoDatas,
        initYoubeData,
        resetSongState,
        handleCheckVideo,
        validationAddSong,
    };
};

export default useCreatePlaylist;
