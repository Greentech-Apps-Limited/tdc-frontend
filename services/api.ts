import { VersesTranslationResponse } from "@/lib/types/surah-translation-type";
import { QuranChapterVerses } from "@/lib/types/verses-type";

// services/api.ts
export const API_BASE_URL = "https://tdc-backend.greentechapps.com/api";

export const fetcher = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        headers: {
            'x-api-token': 'KHY3His3lV89Rky6',
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
    chapterId: string,
    languageCode: string = 'en'
) => {
    return fetcher<QuranChapterVerses>(
        `${API_BASE_URL}/quran/verses/?chapter_id=${chapterId}&wbw_language=${languageCode}`
    );
};

export const getVerseTranslations = async (
    chapterId: string,
    translationId: string
) => {
    return fetcher<VersesTranslationResponse>(
        `${API_BASE_URL}/quran/translations/${translationId}/?chapter_id=${chapterId}`
    );
};

export const fetchSurahData = async (
    surahId: string,
    translationIds: string[],
    tafseerIds: string[],
    languageCode: string = 'en'
) => {
    try {
        // Fetch verses, translations, and tafseer in parallel
        const [versesData, ...translationsAndTafseerData] = await Promise.all([
            getQuranVerses(surahId, languageCode),
            ...translationIds.map(id => getVerseTranslations(surahId, id)),
            ...tafseerIds.map(id => getVerseTranslations(surahId, id)) // Using the same API endpoint for tafseer
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


export const getTranslationViewRequestKey = ({
    chapterId,
    pageNumber,
    translationIds,
    languageCode,
    limit = 20,
}: {
    chapterId: string;
    pageNumber: number;
    translationIds: string[];
    languageCode: string;
    limit?: number;
}) => {
    const offset = (pageNumber - 1) * limit;

    return {
        versesKey: `verses-${chapterId}-${offset}-${languageCode}`,
        translationsKeys: translationIds.map(id =>
            `translation-${id}-${chapterId}-${offset}`
        ),
        params: {
            offset,
            limit,
        }
    };
};