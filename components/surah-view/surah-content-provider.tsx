import { Surah } from '@/lib/types/quran-meta-types';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import { generateVerseKeys } from '@/lib/utils/verse-utils';
import { Suspense } from 'react';
import SurahDetailsMain from './surah-details-main';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import {
  QuranChapterVerses,
  QuranVerse,
  SegmentVerses,
  SurahPosition,
} from '@/lib/types/verses-type';
import { fetcher } from '@/services/api';

export const fetchSegmentVerses = async (
  segmentType: 'juz' | 'page' | 'hizb' | 'ruku',
  segmentNumber: string | number,
  surahs: Surah[]
): Promise<SegmentVerses> => {
  const data = await fetcher<QuranChapterVerses>(
    `/quran/verses/?${segmentType === 'hizb' ? 'rub' : segmentType}_number=${segmentNumber}&limit=999`
  );

  const verses: string[] = [];
  const surahPositions: SurahPosition[] = [];
  let currentSurahNumber: number | null = null;

  data.results.forEach((verse: QuranVerse, index: number) => {
    verses.push(verse.verse_key);

    if (verse.chapter !== currentSurahNumber) {
      const surah = surahs.find(s => s.id === verse.chapter);
      if (surah) {
        surahPositions.push({
          surah,
          startIndex: index,
        });
      }
      currentSurahNumber = verse.chapter;
    }
  });

  return { verses, surahPositions };
};

type SurahContentProviderProps = {
  surahs: Surah[];
  translationInfos: TranslationItem[];
  quranSegment: QuranSegment;
  segmentId: string;
};

const SurahContentProvider = async ({
  surahs,
  translationInfos,
  quranSegment,
  segmentId,
}: SurahContentProviderProps) => {
  let verses: string[];
  let totalVerseCount: number;
  let surahInfos: SurahPosition[];

  if (quranSegment === 'surah') {
    const surah = surahs.find(surah => surah.id === parseInt(segmentId));
    if (!surah) {
      return <div className="p-4 text-center">Surah with id {segmentId} not found</div>;
    }
    verses = generateVerseKeys(surah.id, surah.verses);
    totalVerseCount = surah.verses;
    surahInfos = [{ surah, startIndex: 0 }];
  } else {
    const { verses: segmentVerses, surahPositions } = await fetchSegmentVerses(
      quranSegment,
      segmentId,
      surahs
    );
    verses = segmentVerses;
    totalVerseCount = verses.length;
    surahInfos = surahPositions;
  }

  return (
    <div>
      <Suspense>
        <SurahDetailsMain
          surahInfos={surahInfos}
          translationInfos={translationInfos}
          verseLookup={verses}
          totalVerseCount={totalVerseCount}
        />
      </Suspense>
    </div>
  );
};

export default SurahContentProvider;
