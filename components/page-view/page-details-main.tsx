import { readData } from '@/lib/read-file';
import { MappingObjectType, Surah } from '@/lib/types/quran-meta-types';
import { Verse, VersesResponse } from '@/lib/types/verses-type';
import VerseDisplayCard from '../surah-view/verse-display-card';
import SurahDisplayCard from '../surah-view/surah-display-card';

type PageDetailsMainProps = {
  surahs: Surah[];
  pageId: string;
};

const PageDetailsMain = async ({ surahs, pageId }: PageDetailsMainProps) => {
  const pageVerseMapping = await readData<MappingObjectType>(
    'data/quran-meta/page-to-chapter-mappings.json'
  );

  const surahIDs = pageVerseMapping[pageId] || [];
  const surahInfos = surahs.filter(surah => surahIDs.includes(surah.id.toString()));

  const versesBySurah = await Promise.all(
    surahInfos.map(async surah => {
      const { verses: surahVerses } = await readData<VersesResponse>(
        `data/verses/surah_id_${surah.id}.json`
      );
      const filteredVerses = surahVerses.filter(verse => verse.page_number === Number(pageId));
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

export default PageDetailsMain;
