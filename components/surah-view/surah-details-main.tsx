'use client';

import useSWR from 'swr';
import { fetchSurahData } from '@/services/api';
import VirtualizedSurahView from './virtualized-surah-view';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import QuranDetailsSkeleton from '../skeleton-loaders/quran-details-skeleton';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { MergedVerse, SurahPosition } from '@/lib/types/verses-type';
import { useGetQueryParamOrSettingsValue } from '@/hooks/use-get-query-param-or-settings-value';
import { createSegment } from '@/lib/utils/api-utils';
import { useParams } from 'next/navigation';
import { QuranSegment } from '@/lib/types/quran-segment-type';

const ReadingProgressTracker = dynamic(() => import('./reading-progress-tracker'), {
  ssr: false,
  loading: () => <QuranDetailsSkeleton />,
});

type SurahDetailsMainProps = {
  translationInfos: TranslationItem[];
  totalVerseCount: number;
  verseLookup: string[];
  surahInfos: SurahPosition[];
};

const SurahDetailsMain = ({
  translationInfos,
  verseLookup,
  totalVerseCount,
  surahInfos,
}: SurahDetailsMainProps) => {
  const { quranSegment, segmentId } = useParams<{
    quranSegment: QuranSegment;
    segmentId: string;
  }>();
  const { translations, wbw_tr, tafseer } = useGetQueryParamOrSettingsValue();
  const [apiPageToVersesMap, setApiPageToVersesMap] = useState<Record<number, MergedVerse[]>>({});

  useEffect(() => {
    setApiPageToVersesMap({});
  }, [translations]);

  const translationIds = useMemo(() => translations, [translations]);
  const tafseerIds = useMemo(() => tafseer, [tafseer]);

  const verses = useMemo(() => Object.values(apiPageToVersesMap).flat(), [apiPageToVersesMap]);

  const segment = useMemo(() => createSegment(segmentId, quranSegment), [segmentId]);

  const swrKey = useMemo(
    () =>
      surahInfos.length > 0
        ? [
            `${quranSegment}-data`,
            segment.segmentType,
            segment.segmentNumber,
            translationIds.join(','),
            tafseerIds.join(','),
            wbw_tr,
          ]
        : null,
    [surahInfos, segment, translationIds, tafseerIds, wbw_tr]
  );

  const { data, isLoading } = useSWR(
    swrKey,
    () =>
      surahInfos.length > 0
        ? fetchSurahData(segment, translationIds, tafseerIds, wbw_tr || 'en')
        : null,
    {
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      revalidateOnFocus: false,
      dedupingInterval: 24 * 60 * 60 * 1000,
    }
  );

  useEffect(() => {
    if (data && (!apiPageToVersesMap[1]?.length || translations !== translationIds)) {
      const { versesData, translationsData, tafseerData } = data;
      const versesWithTranslationsAndTafseer = versesData.results.map(verse => {
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

        const verseTafseer = tafseerIds.map((id, index) => {
          const tafseer = tafseerData[index]?.results.find(t => t.verse_number === verse.no);
          const tafseerInfo = translationInfos.find(t => t.id === Number(id));
          return {
            info: tafseerInfo,
            text: tafseer?.text || '',
          };
        });

        return {
          ...verse,
          combinedTranslations: verseTranslations,
          combinedTafseer: verseTafseer,
        };
      });

      setApiPageToVersesMap(prev => ({
        ...prev,
        1: versesWithTranslationsAndTafseer,
      }));
    }
  }, [data, translationIds, tafseerIds, translationInfos, apiPageToVersesMap, translations]);

  if (isLoading || !data) {
    return <QuranDetailsSkeleton />;
  }

  return (
    <ReadingProgressTracker verses={verseLookup}>
      <VirtualizedSurahView
        surahInfos={surahInfos}
        initialVerses={verses}
        totalVerseCount={totalVerseCount}
        translationIds={translationIds}
        wbwTr={wbw_tr}
        tafseerIds={tafseerIds}
        translationInfos={translationInfos}
        setApiPageToVersesMap={setApiPageToVersesMap}
        verseLookup={verseLookup}
      />
    </ReadingProgressTracker>
  );
};

export default SurahDetailsMain;
