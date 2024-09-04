'use server';

import path from 'path';
import { readData } from "../read-file";
import { MergedVerse, Verse, VersesResponse } from "../types/verses-type";
import { WbwVersesResponse } from "../types/wbw-type";

export async function getVersesBySurah(surahId: string): Promise<Verse[]> {
    try {
        const filePath = path.join(process.cwd(), `data/verses/surah_id_${surahId}.json`);
        const { verses } = await readData<VersesResponse>(filePath);
        return verses;
    } catch (error) {
        console.error(`Error fetching verses for surah ${surahId}:`, error);
        return [];
    }
}

export async function getWbwVersesBySurah(surahId: string, languageCode: string = 'en'): Promise<WbwVersesResponse> {
    const filePath = path.join(process.cwd(), `data/wbw/${languageCode}/wbw_surah_id_${surahId}.json`);
    return await readData<WbwVersesResponse>(filePath);
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