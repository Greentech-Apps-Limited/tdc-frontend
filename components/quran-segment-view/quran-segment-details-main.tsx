import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { MergedVerse, Verse } from '@/lib/types/verses-type';
import SurahDisplayCard from '../surah-view/surah-display-card';
import VerseDisplayCard from '../surah-view/verse-display-card';
import { getMergedVersesBySurah } from '@/lib/utils/data-manipulation';

type QuranSegmentDetailsMainProps = {
  params: {
    quranSegment?: Exclude<QuranSegment, 'surah'>;
    segmentId: string;
  };
  surahs: Surah[];
  searchParams?: {
    wbw_tr?: string;
  };
};

const QuranSegmentDetailsMain = async ({
  surahs,
  params,
  searchParams,
}: QuranSegmentDetailsMainProps) => {
  const { quranSegment, segmentId } = params;
  let segmentData: Array<{ surahInfo: Surah; mergedVerses: MergedVerse[] }> = [];

  const mappingPaths = {
    page: 'data/quran-meta/page-to-surah-mappings.json',
    juz: 'data/quran-meta/juz-to-surah-mappings.json',
    hizb: 'data/quran-meta/rub-el-hizb-to-surah-mappings.json',
    ruku: 'data/quran-meta/ruku-surah-mapping.json',
  };

  if (quranSegment && mappingPaths[quranSegment]) {
    const filterKey =
      quranSegment === 'hizb' ? 'rub_el_hizb_number' : (`${quranSegment}_number` as keyof Verse);
    segmentData = await getMergedVersesBySurah(
      segmentId,
      mappingPaths[quranSegment],
      filterKey,
      surahs,
      searchParams?.wbw_tr
    );
  }

  return (
    <div>
      {segmentData.map(({ surahInfo, mergedVerses }) => (
        <SurahDisplayCard key={surahInfo.id} surah={surahInfo}>
          {mergedVerses.map(mergedVerse => (
            <VerseDisplayCard key={mergedVerse.id} verse={mergedVerse} />
          ))}
        </SurahDisplayCard>
      ))}
    </div>
  );
};

export default QuranSegmentDetailsMain;
