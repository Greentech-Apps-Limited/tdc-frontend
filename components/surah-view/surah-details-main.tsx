'use client';

import useSWR from 'swr';
import { fetchSurahData } from '@/services/api';
import { parseTranslationIds } from '@/lib/utils/translation-utils';
import ReadingProgressTracker from './reading-progress-tracker';
import VirtualizedSurahView from './virtualized-surah-view';
import { Surah } from '@/lib/types/quran-meta-types';
import { SearchParamsType } from '@/lib/types/search-params-type';
import { TranslationItem } from '@/lib/types/surah-translation-type';

type SurahDetailsMainProps = {
  surahs: Surah[];
  translationInfos: TranslationItem[];
  surahId: string;
  searchParams: SearchParamsType;
};

const SurahDetailsMain = ({
  surahs,
  surahId,
  translationInfos,
  searchParams,
}: SurahDetailsMainProps) => {
  const translationIds = parseTranslationIds(searchParams?.translations);
  const surah = surahs.find(surah => surah.id === parseInt(surahId));

  const { data, isLoading } = useSWR(
    surah ? ['surah-data', surahId, translationIds.join(','), searchParams.wbw_tr] : null,
    () => (surah ? fetchSurahData(surahId, translationIds, searchParams.wbw_tr || 'en') : null)
  );

  if (!surah) {
    return <div className="p-4 text-center">Surah with id {surahId} not found</div>;
  }

  if (isLoading || !data) {
    return <div className="p-4 text-center">Loading surah data...</div>;
  }

  const { versesData, translationsData } = data;

  const versesWithTranslations = versesData.results.map(verse => {
    const verseTranslations = translationIds.map((id, index) => {
      const translation = translationsData[index]?.results.find(t => t.verse_number === verse.no);

      const translationInfo = translationInfos.find(t => t.id === Number(id));
      return {
        info: translationInfo,
        text: translation?.text || '',
      };
    });

    return {
      ...verse,
      combinedTranslations: verseTranslations,
    };
  });

  return (
    <ReadingProgressTracker verses={versesWithTranslations}>
      <VirtualizedSurahView verses={versesWithTranslations} surahId={surahId} surah={surah} />
    </ReadingProgressTracker>
  );
};

export default SurahDetailsMain;
