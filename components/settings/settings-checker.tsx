'use client';

import { useEffect, useCallback } from 'react';
import { useCheckSettingsDiff } from '@/hooks/use-check-settings-diff';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import useSettingsStore from '@/stores/settings-store';

export function SettingsChecker() {
  const { wbwTr, selectedTranslation } = useSettingsStore();
  const checkSettingsDiff = useCheckSettingsDiff();
  const updateSearchParams = useUpdateSearchParams();

  const memoizedCheckSettingsDiff = useCallback(() => checkSettingsDiff(), [checkSettingsDiff]);

  useEffect(() => {
    const { wbwDiff, translationsDiff } = memoizedCheckSettingsDiff();
    if (wbwDiff || translationsDiff) {
      updateSearchParams(wbwTr || 'en', selectedTranslation || [20]);
    }
  }, [wbwTr, selectedTranslation, memoizedCheckSettingsDiff, updateSearchParams]);

  return null;
}
