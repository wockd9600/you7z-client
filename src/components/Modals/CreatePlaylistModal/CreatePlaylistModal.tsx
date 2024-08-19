import React, { useRef, useEffect, useCallback } from "react";

import Modal from "../../Common/Modal";
import CreatePlaylistModalHeader from "./CreatePlaylistModalHeader";
import PageNavigation from "./PageNavigation";
import SongForm from "./SongForm";
import PlaylistInfo from "./PlaylistInfo";

import useCreatePlaylist from "hooks/useCreatePlaylist";
import { resetSongForm, checkSongFormData, getSong } from "./helpers";

import { Song } from "types";

interface SetNameModalProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isOpen: boolean;
    onClose: React.MouseEventHandler<HTMLButtonElement | HTMLDivElement>;
}

const CreatePlaylistModal = ({ isOpen, onClose }: SetNameModalProps) => {
    const youtubeLinkRef = useRef<HTMLInputElement>(null);
    const startTimeRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const {
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
        handleCheckVideo,
        validationAddSong,
        resetSongState,
    } = useCreatePlaylist();

    const setSongInputValue = useCallback(
        (page: number) => {
            const song = songs[page];
            if (song) {
                if (youtubeLinkRef.current) {
                    youtubeLinkRef.current.value = song.youtubeLink;
                    initYoubeData(page);
                }
                if (startTimeRef.current) startTimeRef.current.value = song.startTime;
                if (answerRef.current) answerRef.current.value = song.answer;
                if (descriptionRef.current) descriptionRef.current.value = song.description || "";
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [songs]
    );

    useEffect(() => {
        if (page < 0) {
            setPlaylistTitle(sessionStorage.getItem("cp-p-title") || "");
            setPlaylistDescription(sessionStorage.getItem("cp-p-description") || "");

            const songs = sessionStorage.getItem("cp-songs");
            if (songs) setSongs(JSON.parse(songs));

            const youtubeDatas = sessionStorage.getItem("cp-yds");
            if (youtubeDatas) setVideoDatas(JSON.parse(youtubeDatas));
        } else {
            setSongInputValue(page);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    const handlePageChange = (newPage: number) => {
        const song: Song = {
            youtubeLink: youtubeLinkRef.current ? youtubeLinkRef.current.value : "",
            startTime: startTimeRef.current ? startTimeRef.current.value : "",
            answer: answerRef.current ? answerRef.current.value : "",
        };
        if (checkSongFormData(song)) {
            const newSong = getSong({ youtubeLinkRef, startTimeRef, answerRef, descriptionRef });
            updateSong(page, newSong);
            updateVideoData(page);
        }
        resetSongForm([youtubeLinkRef, startTimeRef, answerRef, descriptionRef]);
        resetSongState();
        goToPage(newPage);
    };

    const handleAddSong = () => {
        const song: Song = {
            youtubeLink: youtubeLinkRef.current ? youtubeLinkRef.current.value : "",
            startTime: startTimeRef.current ? startTimeRef.current.value : "",
            answer: answerRef.current ? answerRef.current.value : "",
        };
        if (!checkSongFormData(song)) return;
        const newSong = getSong({ youtubeLinkRef, startTimeRef, answerRef, descriptionRef });
        resetSongForm([youtubeLinkRef, startTimeRef, answerRef, descriptionRef]);
        resetSongState();
        addSong(newSong);
        addVideoData();
        nextPage();
    };

    const handleDeleteSong = () => {
        resetSongForm([youtubeLinkRef, startTimeRef, answerRef, descriptionRef]);
        resetSongState();
        deleteSong(page);
        deleteVideoData(page);
        prevPage();
    };

    const songFormProps = {
        youtubeLinkRef,
        startTimeRef,
        answerRef,
        descriptionRef,
        page,
        songsLength: songs.length,
        handleAddSong,
        handleDeleteSong,
        videoData,
        handleCheckVideo,
        validationAddSong,
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <CreatePlaylistModalHeader songs={songs} createPlaylist={createPlaylist} />
            <PageNavigation page={page} songsLength={songs.length} handlePageChange={handlePageChange} />

            {page === -1 ? (
                <PlaylistInfo playlistTitle={playlistTitle} playlistDescription={playlistDescription} setPlaylistTitle={setPlaylistTitle} setPlaylistDescription={setPlaylistDescription} handlePageChange={handlePageChange} />
            ) : (
                <article>
                    <SongForm {...songFormProps} />
                </article>
            )}
        </Modal>
    );
};

export default CreatePlaylistModal;
