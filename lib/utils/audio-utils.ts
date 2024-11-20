import { BufferedRange, Timestamp } from "../types/audio";

export const createTimestampMap = (timestamps: Timestamp[]): Map<string, number> =>
    new Map(timestamps.map(t => [t.verse_key, t.timestamp_from / 1000]));

export const findActiveVerse = (currentTime: number, timestamps: Timestamp[]): Timestamp | undefined =>
    timestamps.find((verse) => currentTime < verse.timestamp_to / 1000);

export const updateBufferedRanges = (audio: HTMLAudioElement): BufferedRange[] => {
    const bufferedRanges: BufferedRange[] = [];
    for (let i = 0; i < audio.buffered.length; i++) {
        bufferedRanges.push({
            start: audio.buffered.start(i),
            end: audio.buffered.end(i),
        });
    }
    return bufferedRanges;
};

export const formatTime = (time: number): string => {
    if (isNaN(time) || !isFinite(time)) return '00:00:00';

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};