import { MergedVerse, Verse } from "../types/verses-type";
import { WbwVersesResponse } from "../types/wbw-type";

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