import { SurahTranslationResponse, TranslationInfo, TranslationInfosType, VerseTranslation, VerseWithTranslations } from "../types/surah-translation-type";
import { MergedVerse } from "../types/verses-type";



const API_BASE_URL = "https://api.quran.com/api/v4";

export const parseTranslationIds = (translations?: string): string[] =>
    translations?.split('-') || ['20']; // Default to '20' if not specified

const buildApiUrl = (surahId: string, translationIds: string[]): string => {
    const translationIdString = translationIds.join(',');
    return `${API_BASE_URL}/verses/by_chapter/${surahId}?page=1&translations=${translationIdString}&per_page=all`;
};

const fetchFromApi = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }
    return await response.json();
};

const createTranslationMap = (verses: VerseWithTranslations[], resourceId: number): Record<string, VerseTranslation> =>
    verses.reduce((acc, verse) => {
        const matchingTranslation = verse.translations.find(t => t.resource_id === resourceId);
        if (matchingTranslation) {
            acc[verse.verse_number.toString()] = matchingTranslation;
        }
        return acc;
    }, {} as Record<string, VerseTranslation>);

export const fetchTranslationsForSurah = async (
    surahId: string,
    translationIds: string[],
    translationInfos: TranslationInfosType
): Promise<{ info: TranslationInfo; translation: Record<string, VerseTranslation> }[]> => {
    const filteredTranslationInfos = translationIds
        .map(id => translationInfos[id])
        .filter((info): info is TranslationInfo => info !== undefined);

    const apiUrl = buildApiUrl(surahId, translationIds);
    const apiResponse = await fetchFromApi<SurahTranslationResponse>(apiUrl);

    return filteredTranslationInfos.map(info => ({
        info,
        translation: createTranslationMap(apiResponse.verses, info.id)
    }));
};

export const addTranslationsToVerses = async (
    verses: MergedVerse[],
    surahId: string,
    translationIds: string[],
    translationInfos: TranslationInfosType
): Promise<MergedVerse[]> => {
    const combinedTranslations = await fetchTranslationsForSurah(surahId, translationIds, translationInfos);

    return verses.map(verse => ({
        ...verse,
        combinedTranslations: combinedTranslations.map(({ info, translation }) => ({
            info,
            text: translation[verse.verse_number.toString()]?.text || ''
        }))
    }));
};
