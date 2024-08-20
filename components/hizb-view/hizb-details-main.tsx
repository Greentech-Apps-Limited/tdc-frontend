import { readData } from '@/lib/read-file';
import { MappingObjectType, Surah } from '@/lib/types/quran-meta-types';
import { Verse, VersesResponse } from '@/lib/types/verses-type';
import SurahDisplayCard from '../surah-view/surah-display-card';
import VerseDisplayCard from '../surah-view/verse-display-card';

type HizbDetailsMainProps = {
  surahs: Surah[];
  hizbId: string;
};

const HizbDetailsMain = async ({ surahs, hizbId }: HizbDetailsMainProps) => {
  const hizbVerseMapping = await readData<MappingObjectType>(
    'data/quran-meta/rub-el-hizb-to-surah-mappings.json'
  );

  const surahIDs = hizbVerseMapping[hizbId] || [];
  const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

  const versesBySurah = await Promise.all(
    surahInfos.map(async surah => {
      const { verses: surahVerses } = await readData<VersesResponse>(
        `data/verses/surah_id_${surah.id}.json`
      );
      const filteredVerses = surahVerses.filter(
        verse => verse.rub_el_hizb_number === Number(hizbId)
      );
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

export default HizbDetailsMain;
