import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import useSettingsStore from '@/stores/settings-store';

interface QueryParamValues {
  translations: string[];
  tafseer: string[];
  wbw_tr: string;
  verse: string;
}

const processParamString = (paramString: string | null): string[] => {
  if (!paramString) return [];

  return paramString.split(',').filter(Boolean).flatMap(item => {

    if (item.includes('-')) {
      const parts = item.split('-');

      if (parts.length !== 2) return [];

      const [startStr, endStr] = parts;
      const start = Number(startStr);
      const end = Number(endStr);

      if (isNaN(start) || isNaN(end)) return [];

      if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || end < 0) {
        return [];
      }

      return [start.toString(), end.toString()];
    }

    const num = Number(item);
    if (!Number.isInteger(num) || isNaN(num) || num < 0) return [];

    return [item];
  });
};

export const useGetQueryParamOrSettingsValue = (): QueryParamValues => {
  const searchParams = useSearchParams();
  const store = useSettingsStore();

  return useMemo(() => {
    const urlTranslations = processParamString(searchParams.get('translations'));
    const mergedTranslations = urlTranslations.length > 0
      ? [...new Set([...urlTranslations, ...store.selectedTranslation.map(String)])]
      : store.selectedTranslation.map(String);

    const urlTafseer = processParamString(searchParams.get('tafseer'));
    const mergedTafseer = urlTafseer.length > 0
      ? [...new Set([...urlTafseer, ...store.selectedTafseer.map(String)])]
      : store.selectedTafseer.map(String);

    return {
      translations: mergedTranslations,
      tafseer: mergedTafseer,
      wbw_tr: searchParams.get('wbw_tr') || store.wbwTr,
      verse: searchParams.get('verse')?.replace('-', ':') || '1:1',
    };
  }, [searchParams, store.selectedTranslation, store.selectedTafseer, store.wbwTr]);
};