'use client';

// import { useCheckSettingsDiff } from '@/hooks/use-check-settings-diff';
// import { useUpdateSearchParams } from '@/hooks/use-update-search-params';
import useSettingsStore, { SettingsActions, SettingsState } from '@/stores/settings-store';
import { createContext, useContext, useRef } from 'react';

const SettingsStoreContext = createContext<typeof useSettingsStore | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const storeRef = useRef(useSettingsStore);
  // const updateSearchParams = useUpdateSearchParams();
  // const checkSettingsDiff = useCheckSettingsDiff();

  // const { wbwDiff, translationsDiff, wbwTr, selectedTranslation } = checkSettingsDiff();
  // if (wbwDiff || translationsDiff) {
  //   updateSearchParams(wbwTr || 'en', selectedTranslation || [20]);
  // }

  return (
    <SettingsStoreContext.Provider value={storeRef.current}>
      {children}
    </SettingsStoreContext.Provider>
  );
}

export function useSettings(): SettingsState & SettingsActions;
export function useSettings<T>(selector: (state: SettingsState & SettingsActions) => T): T;
export function useSettings<T>(selector?: (state: SettingsState & SettingsActions) => T) {
  const store = useContext(SettingsStoreContext);
  if (!store) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return selector ? store(selector) : store();
}