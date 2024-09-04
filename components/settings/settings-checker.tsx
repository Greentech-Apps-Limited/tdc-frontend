'use client';

import { useEffect } from 'react';
import { useCheckSettingsDiff } from '@/hooks/use-check-settings-diff';
import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import { useSettings } from '@/contexts/settings-provider';

export function SettingsChecker({ children }: { children: React.ReactNode }) {
  const { wbwTr, selectedTranslation } = useSettings();
  const checkSettingsDiff = useCheckSettingsDiff();
  const updateSearchParams = useUpdateSearchParams();

  useEffect(() => {
    const { wbwDiff, translationsDiff } = checkSettingsDiff();
    if (wbwDiff || translationsDiff) {
      updateSearchParams(wbwTr || 'en', selectedTranslation || [20]);
    }
  }, [wbwTr, selectedTranslation, checkSettingsDiff, updateSearchParams]);

  return <>{children}</>;
}
