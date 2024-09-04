import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { MergedVerse, Verse } from '@/lib/types/verses-type';
import SurahDisplayCard from '../surah-view/surah-display-card';
import { getVersesBySurah } from '@/lib/utils/data-manipulation';
import { readData } from '@/lib/read-file';
import { WbwVersesResponse } from '@/lib/types/wbw-types';
import VerseDisplayCard from '../surah-view/verse-display-card';

type QuranSegmentDetailsMainProps = {
  params: {
    quranSegment: Exclude<QuranSegment, 'surah'>;
    segmentId: string;
  };
  surahs: Surah[];
  searchParams?: {
    wbw_tr?: string;
  };
};

const QuranSegmentDetailsMain = async ({ surahs, params }: QuranSegmentDetailsMainProps) => {
  const { quranSegment, segmentId } = params;
  let segmentData: Array<{ surahInfo: Surah; verses: Verse[] }> = [];

  const mappings: Record<Exclude<QuranSegment, 'surah'>, string> = {
    page: 'data/quran-meta/page-to-surah-mappings.json',
    juz: 'data/quran-meta/juz-to-surah-mappings.json',
    hizb: 'data/quran-meta/rub-el-hizb-to-surah-mappings.json',
    ruku: 'data/quran-meta/ruku-surah-mapping.json',
  };

  segmentData = await getVersesBySurah(
    segmentId,
    mappings[quranSegment],
    `${quranSegment}_number`,
    surahs
  );

  const mergedSegmentData = await Promise.all(
    segmentData.map(async ({ surahInfo, verses }) => {
      const wbwSurahResponse = await readData<WbwVersesResponse>(
        `data/wbw/en/wbw_surah_id_${surahInfo.id}.json`
      );

      const mergedVerses: MergedVerse[] = verses.map(verse => {
        const wbwVerse = wbwSurahResponse.verses.find(
          wbw => wbw.verse_number === verse.verse_number
        );
        return {
          ...verse,
          words: wbwVerse?.words || [],
        };
      });

      return { surahInfo, verses: mergedVerses };
    })
  );

  return (
    <div>
      {mergedSegmentData.map(({ surahInfo, verses }) => (
        <SurahDisplayCard key={surahInfo.id} surah={surahInfo}>
          {verses.map(verse => (
            <VerseDisplayCard key={verse.id} verse={verse} />
          ))}
        </SurahDisplayCard>
      ))}
    </div>
  );
};

export default QuranSegmentDetailsMain;
