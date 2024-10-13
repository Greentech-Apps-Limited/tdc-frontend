import { useCallback } from 'react';
import useSettingsStore from "@/stores/settings-store";

export const useCheckSettingsDiff = () => {
    const { wbwTr, selectedTranslation } = useSettingsStore();

    const checkSettingsDiff = useCallback(() => {
        const defaultWbwTr = 'en';
        const defaultTranslations = [20];
        const wbwDiff = wbwTr !== defaultWbwTr;
        const translationsDiff = JSON.stringify(selectedTranslation) !== JSON.stringify(defaultTranslations);
        return {
            wbwDiff,
            translationsDiff,
            wbwTr: wbwDiff ? wbwTr : undefined,
            selectedTranslation: translationsDiff ? selectedTranslation : undefined,
        };
    }, [wbwTr, selectedTranslation]);

    return checkSettingsDiff;
};