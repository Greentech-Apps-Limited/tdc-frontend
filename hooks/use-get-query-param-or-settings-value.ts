import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import useSettingsStore from '@/stores/settings-store';

interface QueryParamValues {
  translations: string[];
  tafseer: string[];
  wbw_tr: string;
  verse: string;
}

export const useGetQueryParamOrSettingsValue = (): QueryParamValues => {
  const searchParams = useSearchParams();
  const store = useSettingsStore();

  return useMemo(() => {
    // Handle translations
    const urlTranslations = searchParams.get('translations');
    const mergedTranslations = urlTranslations
      ? [...new Set([...urlTranslations.split(','), ...store.selectedTranslation.map(String)])]
      : store.selectedTranslation.map(String);

    // Handle tafseer
    const urlTafseer = searchParams.get('tafseer');
    const mergedTafseer = urlTafseer
      ? [...new Set([...urlTafseer.split(','), ...store.selectedTafseer.map(String)])]
      : store.selectedTafseer.map(String);

    return {
      translations: mergedTranslations,
      tafseer: mergedTafseer,
      wbw_tr: searchParams.get('wbw_tr') || store.wbwTr,
      verse: searchParams.get('verse')?.replace('-', ':') || '1:1',
    };
  }, [searchParams, store.selectedTranslation, store.selectedTafseer, store.wbwTr]);
};