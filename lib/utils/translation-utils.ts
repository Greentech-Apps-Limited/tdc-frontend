import { readData } from "../read-file";
import { SurahTranslation, TranslationInfo, TranslationInfosType } from "../types/surah-translation-type";
import { MergedVerse } from "../types/verses-type";

export function parseTranslationIds(searchParams: { translations?: string }): string[] {
    return searchParams.translations ? searchParams.translations.split('-') : ['20']; // Default to '20' if not specified
}


export async function fetchTranslationsForSurah(
    surahId: string,
    translationIds: string[],
    translationInfos: TranslationInfosType
): Promise<{ info: TranslationInfo; translation: SurahTranslation }[]> {
    const filteredTranslationInfos = translationIds
        .map(id => translationInfos[id])
        .filter((info): info is TranslationInfo => info !== undefined);

    return Promise.all(
        filteredTranslationInfos.map(async info => {
            const translation = await readData<SurahTranslation>(
                `data/translations/en/${info.id}/surah_id_${surahId}.json`
            );
            return { info, translation };
        })
    );
}


export async function addTranslationsToVerses(
    verses: MergedVerse[],
    surahId: string,
    translationIds: string[],
    translationInfos: TranslationInfosType
): Promise<MergedVerse[]> {
    const combinedTranslations = await fetchTranslationsForSurah(surahId, translationIds, translationInfos);

    return verses.map(verse => ({
        ...verse,
        combinedTranslations: combinedTranslations.map(({ info, translation }) => ({
            info,
            text: translation[verse.verse_number]?.text || ''
        }))
    }));
}