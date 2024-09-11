type AudioSegment = [number, number?, number?];
type Timestamp = {
    verse_key: string;
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
    segments: AudioSegment[];
}
export type AudioFile = {
    id: number;
    chapter_id: number;
    file_size: number;
    format: string;
    audio_url: string;
    timestamps: Timestamp[];
}
export type AudioResponse = {
    audio_file: AudioFile;
}