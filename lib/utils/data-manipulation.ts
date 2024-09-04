'use server'

import { readData } from "../read-file";
import { MappingObjectType, Surah } from "../types/quran-meta-types";
import { MergedVerse, Verse } from "../types/verses-type";
import { WbwVersesResponse } from "../types/wbw-type";

export async function getMergedVersesBySurah(
    segmentId: string,
    mappingPath: string,
    filterKey: keyof Verse,
    surahs: Surah[],
    languageCode?: string
): Promise<Array<{ surahInfo: Surah; mergedVerses: MergedVerse[] }>> {
    const verseMapping: MappingObjectType = await readData(mappingPath);
    const surahIDs = verseMapping[segmentId] || [];

    const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

    const versesBySurah = await Promise.all(
        surahInfos.map(async surah => {
            const { verses: surahVerses }: { verses: Verse[] } = await readData(
                `data/verses/surah_id_${surah.id}.json`
            );
            const wbwSurahResponse = await readData<WbwVersesResponse>(
                `data/wbw/${languageCode ? languageCode : 'en'}/wbw_surah_id_${surah.id}.json`
            );

            const filteredVerses = surahVerses.filter(verse => verse[filterKey] === Number(segmentId));

            const mergedVerses: MergedVerse[] = filteredVerses.map(verse => {
                const wbwVerse = wbwSurahResponse.verses.find(wbw => wbw.verse_number === verse.verse_number);
                return {
                    ...verse,
                    words: wbwVerse?.words || [],
                };
            });

            return { surahId: surah.id, mergedVerses };
        })
    );

    return surahInfos.map(surahInfo => ({
        surahInfo,
        mergedVerses: versesBySurah.find(vs => vs.surahId === surahInfo.id)?.mergedVerses || [],
    }));
}