export type LastReadItem = {
    surah_id: number;
    ayah_id: number;
    timestamp: number;
    type: string;
}

export type LastReadData = {
    surah: Record<string, LastReadItem>;
    juz: Record<string, LastReadItem>;
    page: Record<string, LastReadItem>;
}
