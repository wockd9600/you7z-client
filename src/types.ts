export interface Song {
    youtubeLink: string;
    startTime: string;
    answer: string;
    description?: string;
}

export interface VideoData {
    title: string;
    duration: string;
    thumbnail: string;
}

export interface Playlist {
    id: number;
    title: string;
    description: string;
    score: number;
    length: number;
    downloaded: boolean;
}
