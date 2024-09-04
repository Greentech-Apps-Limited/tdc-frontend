import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { Verse } from '@/lib/types/verses-type';
import SurahDisplayCard from '../surah-view/surah-display-card';
import { getVersesBySurah } from '@/lib/utils/data-manipulation';

type QuranSegmentDetailsMainProps = {
  params: {
    quranSegment?: QuranSegment;
    segmentId: string;
  };
  searchParams?: {
    wbw_tr?: string;
  };
  surahs: Surah[];
};

const QuranSegmentDetailsMain = async ({
  surahs,
  params,
  searchParams,
}: QuranSegmentDetailsMainProps) => {
  console.log(searchParams);
  const { quranSegment, segmentId } = params;
  let segmentData: Array<{ surahInfo: Surah; verses: Verse[] }> = [];

  switch (quranSegment) {
    case 'page':
      segmentData = await getVersesBySurah(
        segmentId,
        'data/quran-meta/page-to-surah-mappings.json',
        'page_number',
        surahs
      );
      break;
    case 'juz':
      segmentData = await getVersesBySurah(
        segmentId,
        'data/quran-meta/juz-to-surah-mappings.json',
        'juz_number',
        surahs
      );
      break;
    case 'hizb':
      segmentData = await getVersesBySurah(
        segmentId,
        'data/quran-meta/rub-el-hizb-to-surah-mappings.json',
        'rub_el_hizb_number',
        surahs
      );
      break;
    case 'ruku':
      segmentData = await getVersesBySurah(
        segmentId,
        'data/quran-meta/ruku-surah-mapping.json',
        'ruku_number',
        surahs
      );
      break;
  }

  return (
    <div>
      {segmentData.map(({ surahInfo }) => {
        return (
          <SurahDisplayCard key={surahInfo.id} surah={surahInfo}>
            <div>test</div>
          </SurahDisplayCard>
        );
      })}
    </div>
  );
};

export default QuranSegmentDetailsMain;
