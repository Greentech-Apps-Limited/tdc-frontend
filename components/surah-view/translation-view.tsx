import { MergedVerse, SurahPosition } from '@/lib/types/verses-type';
import VerseDisplayCardSkeleton from '../skeleton-loaders/verse-display-card-skeleton';
import VerseDisplayCard from './verse-display-card';
import useDedupedFetchVerse from '@/hooks/use-deduped-fetch-verse';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import { useParams } from 'next/navigation';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { Separator } from '../ui/separator';

type TranslationViewProps = {
  verseIdx: number;
  initialVerses: MergedVerse[];
  totalVerseCount: number;
  surahInfos: SurahPosition[];
  wbwTr: string;
  tafseerIds: string[];
  translationIds: string[];
  translationInfos: TranslationItem[];
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};

const TranslationView = ({
  totalVerseCount,
  verseIdx,
  initialVerses,
  translationIds,
  translationInfos,
  setApiPageToVersesMap,
  wbwTr,
  tafseerIds,
  surahInfos,
}: TranslationViewProps) => {
  const { quranSegment, segmentId } = useParams<{ quranSegment: string; segmentId: string }>();

  const { verse, isLoading } = useDedupedFetchVerse({
    verseIdx,
    segmentType: quranSegment as QuranSegment,
    segmentNumber: segmentId,
    translationIds,
    translationInfos,
    initialVerses,
    versesPerPage: 20,
    setApiPageToVersesMap,
    wbwTr,
    tafseerIds,
  });

  if (isLoading || !verse) {
    return <VerseDisplayCardSkeleton />;
  }
  const CHAPTERS_WITHOUT_BISMILLAH = [1, 9];

  const matchingSurah = surahInfos.find(info => info.startIndex === verseIdx);

  return (
    <>
      {matchingSurah ? (
        <div>
          {verseIdx !== 0 && <Separator className="my-4 md:my-6" />}
          <div>
            <div className="mt-4 flex items-center justify-between md:mt-6">
              <h1 className="font-hidayatullah_demo text-xl font-bold md:text-3xl">
                {matchingSurah.surah.transliteration}
              </h1>
              {!CHAPTERS_WITHOUT_BISMILLAH.includes(matchingSurah.surah.id) && (
                <p
                  className="theme-palette-normal bismillah text-sm font-semibold text-neutral-500 md:text-2xl"
                  dir="rtl"
                  style={{
                    fontFamily: `var(--font-bismillah)`,
                    filter: 'brightness(0)',
                  }}
                >
                  ﲪﲫﲮﲴ
                </p>
              )}
            </div>

            <VerseDisplayCard verse={verse} />
          </div>
        </div>
      ) : (
        <VerseDisplayCard verse={verse} isLastVerse={totalVerseCount - 1 === verseIdx} />
      )}
    </>
  );
};

export default TranslationView;
