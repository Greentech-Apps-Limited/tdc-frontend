import { MergedVerse } from '@/lib/types/verses-type';
import VerseDisplayCardSkeleton from '../skeleton-loaders/verse-display-card-skeleton';
import VerseDisplayCard from './verse-display-card';
import useDedupedFetchVerse from '@/hooks/use-deduped-fetch-verse';
import { useParams } from 'next/navigation';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { Separator } from '../ui/separator';
import { useNumberTranslation } from '@/hooks/use-number-translation';
import { useVerseContext } from '@/contexts/verse-provider';

type TranslationViewProps = {
  verseIdx: number;
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};

const TranslationView = ({ verseIdx, setApiPageToVersesMap }: TranslationViewProps) => {
  const { quranSegment, segmentId } = useParams<{ quranSegment: string; segmentId: string }>();
  const {
    initialVerses,
    totalVerseCount,
    translationIds,
    translationInfos,
    wbwTr,
    tafseerIds,
    surahInfos,
  } = useVerseContext();
  const translateNumber = useNumberTranslation();

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

  const getRevealedLocation = (revelationNumber: number) => {
    return revelationNumber === 1 ? 'Makkah' : 'Madinah';
  };
  return (
    <>
      {matchingSurah ? (
        <div>
          {verseIdx !== 0 && <Separator className="my-4 md:my-6" />}
          <div>
            <div className="mt-4 flex items-center justify-between md:mt-6">
              <div>
                <h1 className="font-hidayatullah_demo text-xl font-bold md:text-3xl">
                  {matchingSurah.surah.transliteration}
                </h1>
                <p className="m-1 text-sm font-semibold text-neutral-600">
                  Ayah - {translateNumber(matchingSurah.surah.verses)},{' '}
                  {getRevealedLocation(matchingSurah.surah.revelation)}
                </p>
              </div>
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

            <VerseDisplayCard verse={verse} setApiPageToVersesMap={setApiPageToVersesMap} />
          </div>
        </div>
      ) : (
        <VerseDisplayCard
          verse={verse}
          isLastVerse={totalVerseCount - 1 === verseIdx}
          setApiPageToVersesMap={setApiPageToVersesMap}
        />
      )}
    </>
  );
};

export default TranslationView;
