import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import useSettingsStore from '@/stores/settings-store';

interface QueryParamValues {
  translations: string[];
  wbw_tr: string;
  verse: string;
}

export const useGetQueryParamOrSettingsValue = (): QueryParamValues => {
  const searchParams = useSearchParams();
  const store = useSettingsStore();

  return useMemo(() => {
    const urlTranslations = searchParams.get('translations');

    // If URL translations exist, merge them with store translations
    const mergedTranslations = urlTranslations
      ? [...new Set([...urlTranslations.split(','), ...store.selectedTranslation.map(String)])]
      : store.selectedTranslation.map(String);

    return {
      translations: mergedTranslations,
      wbw_tr: searchParams.get('wbw_tr') || store.wbwTr,
      verse: searchParams.get('verse')?.replace('-', ':') || '1:1',
    };
  }, [searchParams, store.selectedTranslation, store.wbwTr]);
};