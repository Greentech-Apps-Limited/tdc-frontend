// import { MergedVerse, } from "../types/verses-type";
// import { WbwVersesResponse } from "../types/wbw-type";

export const fetcher = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${url}`);
    }
    return response.json() as Promise<T>;
};

// export async function getVersesBySurah(surahId: string, totalVerses: number): Promise<Verse[]> {
//     const { verses } = await fetcher<VersesResponse>(`https://api.quran.com/api/v4/verses/by_chapter/${surahId}?fields=text_uthmani&page=1&per_page=${totalVerses}`);
//     return verses;
// }

// export async function getWbwVersesBySurah(surahId: string, totalVerses: number, languageCode: string = 'en'): Promise<WbwVersesResponse> {
//     return await fetcher<WbwVersesResponse>(`https://api.quran.com/api/v4/verses/by_chapter/${surahId}?language=${languageCode}&page=1&per_page=${totalVerses}&word_fields=text_uthmani,location&words=true`);
// }

// export function mergeVersesWithWbw(verses: Verse[], wbwVerses: WbwVersesResponse): MergedVerse[] {
//     return verses.map(verse => {
//         const wbwVerse = wbwVerses.verses.find(wbw => wbw.verse_number === verse.verse_number);
//         return {
//             ...verse,
//             words: wbwVerse?.words || [],
//         };
//     });
// }

// export function filterVersesBySegment(verses: Verse[], segmentId: string, filterKey: keyof Verse): Verse[] {
//     return verses.filter(verse => verse[filterKey] === Number(segmentId));
// }


export const calculateWbwFontSize = (arabicFontSize: number): number => {
    const minWbwSize = 12;
    const maxWbwSize = 20;
    const minArabicSize = 32;
    const maxArabicSize = 60;

    const proportion = (arabicFontSize - minArabicSize) / (maxArabicSize - minArabicSize);

    const wbwSize = minWbwSize + proportion * (maxWbwSize - minWbwSize);

    return Math.max(minWbwSize, Math.min(maxWbwSize, Math.round(wbwSize)));
};

export const generateVerseKeys = (surahId: number, totalVerses: number): string[] => {
    return Array.from({ length: totalVerses }, (_, index) => `${surahId}:${index + 1}`);
};