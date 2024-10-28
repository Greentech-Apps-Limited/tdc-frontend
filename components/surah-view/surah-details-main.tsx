'use client';

import useSWR from 'swr';
import { fetchSurahData } from '@/services/api';
import VirtualizedSurahView from './virtualized-surah-view';
import { Surah } from '@/lib/types/quran-meta-types';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import QuranDetailsSkeleton from '../skeleton-loaders/quran-details-skeleton';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { MergedVerse } from '@/lib/types/verses-type';
import { useGetQueryParamOrSettingsValue } from '@/hooks/use-get-query-param-or-settings-value';

const ReadingProgressTracker = dynamic(() => import('./reading-progress-tracker'), { ssr: false });

type SurahDetailsMainProps = {
  surahs: Surah[];
  translationInfos: TranslationItem[];
  surahId: string;
  totalVerseCount: number;
  verseLookup: string[];
};

const SurahDetailsMain = ({
  surahs,
  surahId,
  translationInfos,
  verseLookup,
  totalVerseCount,
}: SurahDetailsMainProps) => {
  const { translations, wbw_tr } = useGetQueryParamOrSettingsValue();
  const [apiPageToVersesMap, setApiPageToVersesMap] = useState<Record<number, MergedVerse[]>>({});

  console.log('translations', translations);
  useEffect(() => {
    setApiPageToVersesMap({});
  }, [translations]);

  const translationIds = useMemo(() => translations, [translations]);
  const surah = useMemo(
    () => surahs.find(surah => surah.id === parseInt(surahId)),
    [surahs, surahId]
  );
  const verses = useMemo(() => Object.values(apiPageToVersesMap).flat(), [apiPageToVersesMap]);

  const swrKey = useMemo(
    () => (surah ? ['surah-data', surahId, translationIds.join(','), wbw_tr] : null),
    [surah, surahId, translationIds, wbw_tr]
  );

  const { data, isLoading } = useSWR(
    swrKey,
    () => (surah ? fetchSurahData(surahId, translationIds, wbw_tr || 'en') : null),
    {
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      dedupingInterval: 24 * 60 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data && (!apiPageToVersesMap[1]?.length || translations !== translationIds)) {
      const { versesData, translationsData } = data;

      const versesWithTranslations = versesData.results.map(verse => {
        const verseTranslations = translationIds.map((id, index) => {
          const translation = translationsData[index]?.results.find(
            t => t.verse_number === verse.no
          );
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

      setApiPageToVersesMap(prev => ({
        ...prev,
        1: versesWithTranslations,
      }));
    }
  }, [data, translationIds, translationInfos, apiPageToVersesMap, translations]);

  if (!surah) {
    return <div className="p-4 text-center">Surah with id {surahId} not found</div>;
  }

  if (isLoading || !data) {
    return <QuranDetailsSkeleton />;
  }

  return (
    <ReadingProgressTracker verses={verses}>
      <VirtualizedSurahView
        initialVerses={verses}
        surahId={surahId}
        surah={surah}
        totalVerseCount={totalVerseCount}
        translationIds={translationIds}
        translationInfos={translationInfos}
        setApiPageToVersesMap={setApiPageToVersesMap}
        verseLookup={verseLookup}
      />
    </ReadingProgressTracker>
  );
};

export default SurahDetailsMain;
