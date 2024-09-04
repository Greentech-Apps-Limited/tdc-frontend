'use server';

import { readData } from '../read-file';
import { MappingObjectType, Surah } from '../types/quran-meta-types';
import { Verse } from '../types/verses-type';

export async function getVersesBySurah(
  segmentId: string,
  mappingPath: string,
  filterKey: keyof Verse,
  surahs: Surah[]
): Promise<Array<{ surahInfo: Surah; verses: Verse[] }>> {
  const verseMapping: MappingObjectType = await readData(mappingPath);
  const surahIDs = verseMapping[segmentId] || [];

  const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

  const versesBySurah = await Promise.all(
    surahInfos.map(async surah => {
      const { verses: surahVerses }: { verses: Verse[] } = await readData(
        `data/verses/surah_id_${surah.id}.json`
      );
      const filteredVerses = surahVerses.filter(verse => verse[filterKey] === Number(segmentId));
      return { surahId: surah.id, verses: filteredVerses };
    })
  );

  return surahInfos.map(surahInfo => ({
    surahInfo,
    verses: versesBySurah.find(vs => vs.surahId === surahInfo.id)?.verses || [],
  }));
}
