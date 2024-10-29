import { API_BASE_URL } from "@/services/api";
import { QuranSegment, SegmentParams } from "../types/quran-segment-type";


const SEGMENT_PARAM_MAP: Record<QuranSegment, string> = {
    surah: 'chapter_id',
    page: 'page_number',
    juz: 'juz_number',
    hizb: 'hizb_number',
    ruku: 'ruku_number'
};

export const createSegmentParams = (
    segmentType: QuranSegment,
    segmentNumber: string | number
): Record<string, string | number> => {
    const baseParams: Record<string, string | number> = {
        chapter_id: '',
        juz_number: '',
        hizb_number: '',
        ruku_number: '',
        page_number: ''
    };

    baseParams[SEGMENT_PARAM_MAP[segmentType]] = segmentNumber;
    return baseParams;
};

export const createQueryString = (params: Record<string, string | number>): string => {
    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== '')
    );
    return new URLSearchParams(
        Object.entries(filteredParams).map(([key, value]) => [key, value.toString()])
    ).toString();
};

export const getPageNumberFromIndexAndPerPage = (index: number, perPage: number): number =>
    Math.ceil((index + 1) / perPage);

export const createRequestKey = (
    segmentType: QuranSegment,
    segmentNumber: string | number,
    pageNumber: number,
    translationIds: string[],
    tafseerIds: string[],
    wbwTr: string
): string =>
    `verses-${segmentType}-${segmentNumber}-${pageNumber}-${translationIds.join(',')}-${tafseerIds.join(',')}-${wbwTr}`;

export const createApiUrl = (
    endpoint: string,
    segmentParams: Record<string, string | number>,
    additionalParams: Record<string, string | number> = {}
): string => {
    const normalizedEndpoint = endpoint.endsWith('/')
        ? endpoint
        : `${endpoint}/`;

    const params = {
        ...segmentParams,
        ...additionalParams
    };

    const filteredParams = Object.fromEntries(
        Object.entries(params).filter(([, value]) => value !== '')
    );

    const searchParams = new URLSearchParams(
        Object.entries(filteredParams).map(([key, value]) => [key, value.toString()])
    );

    return `${API_BASE_URL}${normalizedEndpoint}?${searchParams.toString()}`;
};


export const createSegment = (id: string | number, type: QuranSegment = 'surah'): SegmentParams => ({
    segmentType: type,
    segmentNumber: id
});
