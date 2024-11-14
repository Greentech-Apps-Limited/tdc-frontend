export type AudioSegment = [number, number?, number?];

export type Timestamp = {
    verse_key: string;
    timestamp_from: number;
    timestamp_to: number;
    duration: number;
    segments: AudioSegment[];
}

export type AudioFile = {
    id: number;
    qari_name: string;
    path: string;
    timestamps: Timestamp[];
}


export interface Reciter {
    id: number;
    qari_name: string;
    path: string;
    language: string;
    style: string;
    speed: string;
}

export interface RecitersResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Reciter[];
}


export type BufferedRange = { start: number; end: number };

