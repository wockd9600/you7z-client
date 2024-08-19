interface Song {
    youtubeLink: string;
    startTime: string;
    answer: string;
    description?: string;
}

export const resetSongForm = (refs: React.RefObject<HTMLInputElement>[]) => {
    refs.forEach((ref) => {
        if (ref.current) ref.current.value = "";
    });
};

export const checkSongFormData = (refs: Song) => {
    return refs.youtubeLink && refs.startTime && refs.answer;
};
// && getYoutubeVideoId(refs.youtubeLinkRef.current?.value)

export const getSong = (refs: { youtubeLinkRef: React.RefObject<HTMLInputElement>; startTimeRef: React.RefObject<HTMLInputElement>; answerRef: React.RefObject<HTMLInputElement>; descriptionRef: React.RefObject<HTMLInputElement> }): Song => ({
    youtubeLink: refs.youtubeLinkRef.current?.value || "",
    startTime: refs.startTimeRef.current?.value || "",
    answer: refs.answerRef.current?.value || "",
    description: refs.descriptionRef.current?.value || "",
});

export const getYoutubeVideoId = (url: string) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const formatDuration = (duration: string) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return;

    const hours = (parseInt(match[1]) || 0).toString().padStart(2, "0");
    const minutes = (parseInt(match[2]) || 0).toString().padStart(2, "0");
    const seconds = (parseInt(match[3]) || 0).toString().padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
};

export const getFormattedTimeValue = (value: string) => {
    const hours = value.slice(0, 2);
    const minutes = value.slice(2, 4);
    const seconds = value.slice(4, 6);

    let formattedValue = hours;
    if (minutes) formattedValue += ":" + minutes;
    if (seconds) formattedValue += ":" + seconds;

    return formattedValue;
};

export const timeToSeconds = (time: string) => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
};

export const compareInputTimeAndVideoDuration = (formattedValue: string, videoDuration: string) => {
    const inputTimeInSeconds = timeToSeconds(formattedValue);
    const videoDurationInSeconds = timeToSeconds(videoDuration);

    if (inputTimeInSeconds > videoDurationInSeconds) return true;
    return false;
};
