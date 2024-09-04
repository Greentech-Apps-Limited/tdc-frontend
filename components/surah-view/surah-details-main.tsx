import { Surah } from '@/lib/types/quran-meta-types';
// import VerseDisplayCard from './verse-display-card';
import SurahDisplayCard from './surah-display-card';
import { TranslationInfosType } from '@/lib/types/surah-translation-type';
// import { addTranslationsToVerses, parseTranslationIds } from '@/lib/utils/translation-utils';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { getVersesBySurah, getWbwVersesBySurah } from '@/lib/actions';
import { mergeVersesWithWbw } from '@/lib/utils/verse-utils';

type SurahDetailsMainProps = {
  surahs: Surah[];
  translationInfos: TranslationInfosType;
  surahId: string;
  searchParams: SearchParamsType;
};

const SurahDetailsMain = async ({
  surahs,
  surahId,
  // translationInfos,
  searchParams,
}: SurahDetailsMainProps) => {
  const surah = surahs.find(surah => surah.id === parseInt(surahId));

  if (!surah) {
    return <div>Surah with id {surahId} not found</div>;
  }

  const [verses, wbwVerses] = await Promise.all([
    getVersesBySurah(surahId),
    getWbwVersesBySurah(surahId, searchParams?.wbw_tr),
  ]);
  const mergedVerses = mergeVersesWithWbw(verses, wbwVerses);

  // const translationIds = parseTranslationIds(searchParams);
  // mergedVerses = await addTranslationsToVerses(
  //   mergedVerses,
  //   surahId,
  //   translationIds,
  //   translationInfos
  // );
  console.log(mergedVerses);
  return (
    <div>
      <SurahDisplayCard surah={surah}>
        testing
        {/* {mergedVerses.map(mergedVerse => (
          <VerseDisplayCard key={mergedVerse.id} verse={mergedVerse} />
        ))} */}
      </SurahDisplayCard>
    </div>
  );
};

export default SurahDetailsMain;
