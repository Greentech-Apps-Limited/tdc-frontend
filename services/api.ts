import { SegmentParams } from "@/lib/types/quran-segment-type";
import { VersesTranslationResponse } from "@/lib/types/surah-translation-type";
import { QuranChapterVerses } from "@/lib/types/verses-type";
import { createQueryString, createSegmentParams } from "@/lib/utils/api-utils";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || '';

const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;
export const fetcher = async <T>(url: string): Promise<T> => {
    const response = await fetch(`${API_BASE_URL}${url}`, {
        headers: {
            'x-api-token': `${API_TOKEN}`,
            'Content-Type': 'application/json',
        },
        next: { revalidate: 24 * 60 * 60 },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }

    return response.json();
};

export const getQuranVerses = async (
    segmentParams: SegmentParams,
    languageCode: string = 'en',
    additionalParams: Record<string, string | number> = {}
) => {
    const params = {
        ...createSegmentParams(segmentParams.segmentType, segmentParams.segmentNumber),
        ...additionalParams,
        wbw_language: languageCode
    };

    return fetcher<QuranChapterVerses>(
        `/quran/verses/?${createQueryString(params)}`
    );
};

export const getVerseTranslations = async (
    segmentParams: SegmentParams,
    translationId: string,
    additionalParams: Record<string, string | number> = {}
) => {
    const params = {
        ...createSegmentParams(segmentParams.segmentType, segmentParams.segmentNumber),
        ...additionalParams
    };

    return fetcher<VersesTranslationResponse>(
        `/quran/translations/${translationId}/?${createQueryString(params)}`
    );
};

export const fetchSurahData = async (
    segmentParams: SegmentParams,
    translationIds: string[],
    tafseerIds: string[],
    languageCode: string = 'en'
) => {
    try {
        // Fetch verses, translations, and tafseer in parallel
        const [versesData, ...translationsAndTafseerData] = await Promise.all([
            getQuranVerses(segmentParams, languageCode),
            ...translationIds.map(id => getVerseTranslations(segmentParams, id)),
            ...tafseerIds.map(id => getVerseTranslations(segmentParams, id)) // Using the same API endpoint for tafseer
        ]);

        const translationsData = translationsAndTafseerData.slice(0, translationIds.length);
        const tafseerData = translationsAndTafseerData.slice(translationIds.length);

        return {
            versesData,
            translationsData,
            tafseerData,
        };
    } catch (error) {
        console.error('Error fetching surah data:', error);
        throw new Error('Failed to fetch surah data');
    }
};


