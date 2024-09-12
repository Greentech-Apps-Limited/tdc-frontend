import { Surah } from '@/lib/types/quran-meta-types';
import { TranslationInfosType } from '@/lib/types/surah-translation-type';
import { addTranslationsToVerses, parseTranslationIds } from '@/lib/utils/translation-utils';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { getVersesBySurah, getWbwVersesBySurah, mergeVersesWithWbw } from '@/lib/utils/verse-utils';
import dynamic from 'next/dynamic';
import QuranDetailsSkeleton from '../skeleton-loaders/quran-details-skeleton';

const SurahDisplayCard = dynamic(() => import('./surah-display-card'), {
  ssr: false,
  loading: () => <QuranDetailsSkeleton />,
});
const VerseDisplayCard = dynamic(() => import('./verse-display-card'), {
  ssr: false,
});

type SurahDetailsMainProps = {
  surahs: Surah[];
  translationInfos: TranslationInfosType;
  surahId: string;
  searchParams: SearchParamsType;
};

const SurahDetailsMain = async ({
  surahs,
  surahId,
  translationInfos,
  searchParams,
}: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));

  if (!surah) {
    return <div>Surah with id {surahId} not found</div>;
  }
  const verses = await getVersesBySurah(surahId, surah.verses);
  const wbwVerses = await getWbwVersesBySurah(surahId, surah.verses, searchParams.wbw_tr);

  let mergedVerses = mergeVersesWithWbw(verses, wbwVerses);

  const translationIds = parseTranslationIds(searchParams?.translations);
  mergedVerses = await addTranslationsToVerses(
    mergedVerses,
    surahId,
    translationIds,
    translationInfos
  );

  return (
    <div>
      <SurahDisplayCard surah={surah}>
        {mergedVerses.map(mergedVerse => (
          <VerseDisplayCard key={mergedVerse.id} verse={mergedVerse} surahId={surahId} />
        ))}
      </SurahDisplayCard>
    </div>
  );
};

export default SurahDetailsMain;
