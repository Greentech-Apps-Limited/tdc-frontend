import { MergedVerse } from '@/lib/types/verses-type';
import VerseDisplayCardSkeleton from '../skeleton-loaders/verse-display-card-skeleton';
import { Surah } from '@/lib/types/quran-meta-types';
import VerseDisplayCard from './verse-display-card';
import useDedupedFetchVerse from '@/hooks/use-deduped-fetch-verse';
import { TranslationItem } from '@/lib/types/surah-translation-type';

type TranslationViewProps = {
  totalVerseCount: number;
  verseIdx: number;
  surahId: string;
  surah: Surah;
  initialVerses: MergedVerse[];
  translationIds: string[];
  translationInfos: TranslationItem[];
  wbwTr: string;
  tafseerIds: string[];
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};
const TranslationView = ({
  totalVerseCount,
  verseIdx,
  surah,
  surahId,
  initialVerses,
  translationIds,
  translationInfos,
  setApiPageToVersesMap,
  wbwTr,
  tafseerIds,
}: TranslationViewProps) => {
  const { verse, isLoading } = useDedupedFetchVerse({
    verseIdx,
    chapterId: surahId,
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

  return (
    <>
      {verseIdx === 0 ? (
        <div>
          <h1 className="mt-6 font-hidayatullah_demo text-3xl font-bold">
            {surah.transliteration}
          </h1>
          <VerseDisplayCard verse={verse} surahId={surahId} />
        </div>
      ) : (
        <VerseDisplayCard
          verse={verse}
          surahId={surahId}
          isLastVerse={totalVerseCount - 1 === verseIdx}
        />
      )}
    </>
  );
};
export default TranslationView;
