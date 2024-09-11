type AudioSegment = [number, number?, number?];
interface Timestamp {
    verse_key: string;
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
    segments: AudioSegment[];
}
export interface AudioFile {
    id: number;
    chapter_id: number;
    file_size: number;
    format: string;
    audio_url: string;
    timestamps: Timestamp[];
}
export interface AudioResponse {
    audio_file: AudioFile;
}