export type QuranSegment = 'surah' | 'page' | 'juz' | 'hizb' | 'ruku';

export type SegmentParams = {
    segmentType: QuranSegment;
    segmentNumber: string | number;
}