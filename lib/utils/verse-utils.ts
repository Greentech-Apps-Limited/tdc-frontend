import { readData } from "../read-file";
import { MergedVerse, Verse, VersesResponse } from "../types/verses-type";
import { WbwVersesResponse } from "../types/wbw-type";

export async function getVersesBySurah(surahId: string): Promise<Verse[]> {
    const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);
    return verses;
}

export async function getWbwVersesBySurah(surahId: string, languageCode: string = 'en'): Promise<WbwVersesResponse> {
    return await readData<WbwVersesResponse>(`data/wbw/${languageCode}/wbw_surah_id_${surahId}.json`);
}

export function mergeVersesWithWbw(verses: Verse[], wbwVerses: WbwVersesResponse): MergedVerse[] {
    return verses.map(verse => {
        const wbwVerse = wbwVerses.verses.find(wbw => wbw.verse_number === verse.verse_number);
        return {
            ...verse,
            words: wbwVerse?.words || [],
        };
    });
}

export function filterVersesBySegment(verses: Verse[], segmentId: string, filterKey: keyof Verse): Verse[] {
    return verses.filter(verse => verse[filterKey] === Number(segmentId));
}


export const calculateWbwFontSize = (arabicFontSize: number): number => {
    const minWbwSize = 12;
    const maxWbwSize = 20;
    const minArabicSize = 32;
    const maxArabicSize = 60;

    const proportion = (arabicFontSize - minArabicSize) / (maxArabicSize - minArabicSize);

    const wbwSize = minWbwSize + proportion * (maxWbwSize - minWbwSize);

    return Math.max(minWbwSize, Math.min(maxWbwSize, Math.round(wbwSize)));
};
