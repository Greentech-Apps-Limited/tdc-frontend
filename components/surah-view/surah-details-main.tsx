import { Surah } from '@/lib/types/quran-meta-types';
import VerseDisplayCard from './verse-display-card';
import SurahDisplayCard from './surah-display-card';
import { TranslationInfosType } from '@/lib/types/surah-translation-type';
import { addTranslationsToVerses, parseTranslationIds } from '@/lib/utils/translation-utils';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { getVersesBySurah, getWbwVersesBySurah, mergeVersesWithWbw } from '@/lib/utils/verse-utils';
import VerseDisplayMain from './verse-display-main';

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
  const verses = await getVersesBySurah(surahId);
  const wbwVerses = await getWbwVersesBySurah(surahId, searchParams?.wbw_tr);
  let mergedVerses = mergeVersesWithWbw(verses, wbwVerses);

  const translationIds = parseTranslationIds(searchParams);
  mergedVerses = await addTranslationsToVerses(
    mergedVerses,
    surahId,
    translationIds,
    translationInfos
  );

  return (
    <div>
      <VerseDisplayMain />
      <SurahDisplayCard surah={surah}>
        {mergedVerses.map(mergedVerse => (
          <VerseDisplayCard key={mergedVerse.id} verse={mergedVerse} />
        ))}
      </SurahDisplayCard>
    </div>
  );
};

export default SurahDetailsMain;
