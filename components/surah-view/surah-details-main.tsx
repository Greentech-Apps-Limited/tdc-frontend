import { Surah } from '@/lib/types/quran-meta-types';
import {
  TranslationInfosType,
  TranslationInfo,
  SurahTranslation,
} from '@/lib/types/surah-translation-type';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { MergedVerse, Verse, VersesResponse } from '@/lib/types/verses-type';
import { WbwVersesResponse } from '@/lib/types/wbw-type';
import { readData } from '@/lib/read-file';
import VerseDisplayCard from './verse-display-card';
import SurahDisplayCard from './surah-display-card';

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

  const getVersesBySurah = async (surahId: string): Promise<Verse[]> => {
    const { verses } = await readData<VersesResponse>(`data/verses/surah_id_${surahId}.json`);
    return verses;
  };

  const getWbwVersesBySurah = async (
    surahId: string,
    languageCode: string = 'en'
  ): Promise<WbwVersesResponse> => {
    return await readData<WbwVersesResponse>(
      `data/wbw/${languageCode}/wbw_surah_id_${surahId}.json`
    );
  };

  const mergeVersesWithWbw = (verses: Verse[], wbwVerses: WbwVersesResponse): MergedVerse[] => {
    return verses.map(verse => ({
      ...verse,
      words: wbwVerses.verses.find(wbw => wbw.verse_number === verse.verse_number)?.words || [],
    }));
  };

  const parseTranslationIds = (searchParams: { translations?: string }): string[] => {
    return searchParams.translations ? searchParams.translations.split('-') : ['20'];
  };

  const fetchTranslationsForSurah = async (
    surahId: string,
    translationIds: string[],
    translationInfos: TranslationInfosType
  ): Promise<{ info: TranslationInfo; translation: SurahTranslation }[]> => {
    const filteredTranslationInfos = translationIds
      .map(id => translationInfos[id])
      .filter((info): info is TranslationInfo => info !== undefined);

    return Promise.all(
      filteredTranslationInfos.map(async info => {
        const translation = await readData<SurahTranslation>(
          `data/translations/en/${info.id}/surah_id_${surahId}.json`
        );
        return { info, translation };
      })
    );
  };

  const addTranslationsToVerses = async (
    verses: MergedVerse[],
    surahId: string,
    translationIds: string[],
    translationInfos: TranslationInfosType
  ): Promise<MergedVerse[]> => {
    const combinedTranslations = await fetchTranslationsForSurah(
      surahId,
      translationIds,
      translationInfos
    );
    return verses.map(verse => ({
      ...verse,
      combinedTranslations: combinedTranslations.map(({ info, translation }) => ({
        info,
        text: translation[verse.verse_number]?.text || '',
      })),
    }));
  };

  const [verses, wbwVerses] = await Promise.all([
    getVersesBySurah(surahId),
    getWbwVersesBySurah(surahId, searchParams?.wbw_tr),
  ]);

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
      <SurahDisplayCard surah={surah}>
        {mergedVerses.map(mergedVerse => (
          <VerseDisplayCard key={mergedVerse.id} verse={mergedVerse} />
        ))}
      </SurahDisplayCard>
    </div>
  );
};

export default SurahDetailsMain;
