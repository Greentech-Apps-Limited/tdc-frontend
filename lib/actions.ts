'use server';
import path from 'path';
import { Verse, VersesResponse } from './types/verses-type';
import { WbwVersesResponse } from './types/wbw-type';
import { readData } from './read-file';


export async function getVersesBySurah(surahId: string): Promise<Verse[]> {
    'use server';
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
