import { readData } from '@/lib/read-file';
import { MappingObjectType, Surah } from '@/lib/types/quran-meta-types';
import { Verse, VersesResponse } from '@/lib/types/verses-type';
import SurahDisplayCard from '../surah-view/surah-display-card';
import VerseDisplayCard from '../surah-view/verse-display-card';

type RukuDetailsMainProps = {
  surahs: Surah[];
  rukuId: string;
};

const RukuDetailsMain = async ({ surahs, rukuId }: RukuDetailsMainProps) => {
  const rukuVerseMapping = await readData<MappingObjectType>(
    'data/quran-meta/ruku-surah-mapping.json'
  );

  const surahIDs = rukuVerseMapping[rukuId] || [];
  const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

  const versesBySurah = await Promise.all(
    surahInfos.map(async surah => {
      const { verses: surahVerses } = await readData<VersesResponse>(
        `data/verses/surah_id_${surah.id}.json`
      );
      const filteredVerses = surahVerses.filter(verse => verse.ruku_number === Number(rukuId));
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
export default RukuDetailsMain;
