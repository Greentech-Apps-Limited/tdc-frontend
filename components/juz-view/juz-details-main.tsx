import { readData } from '@/lib/read-file';
import { MappingObjectType, Surah } from '@/lib/types/quran-meta-types';
import { Verse, VersesResponse } from '@/lib/types/verses-type';
import VerseDisplayCard from '../surah-view/verse-display-card';
import SurahDisplayCard from '../surah-view/surah-display-card';

type JuzDetailsMainProps = {
  surahs: Surah[];
  juzId: string;
};
const JuzDetailsMain = async ({ surahs, juzId }: JuzDetailsMainProps) => {
  const juzVerseMapping = await readData<MappingObjectType>(
    'data/quran-meta/juz-to-surah-mappings.json'
  );

  const surahIDs = juzVerseMapping[juzId] || [];
  const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

  const versesBySurah = await Promise.all(
    surahInfos.map(async surah => {
      const { verses: surahVerses } = await readData<VersesResponse>(
        `data/verses/surah_id_${surah.id}.json`
      );
      const filteredVerses = surahVerses.filter(verse => verse.juz_number === Number(juzId));
      return {
        surahId: surah.id,
        verses: filteredVerses,
      };
    })
  );

  const versesBySurahMap = versesBySurah.reduce(
    (acc, { surahId, verses }) => {
      acc[surahId] = verses;
      return acc;
    },
    {} as { [key: number]: Verse[] }
  );

  return (
    <div>
      {surahInfos.map(surahInfo => {
        return (
          <SurahDisplayCard key={surahInfo.id} surah={surahInfo}>
            {versesBySurahMap[surahInfo.id]?.map(verse => {
              return <VerseDisplayCard key={verse.id} verse={verse} />;
            })}
          </SurahDisplayCard>
        );
      })}
    </div>
  );
};

export default JuzDetailsMain;
