import { useCheckSettingsDiff } from './use-check-settings-diff';
import { useUpdateSearchParams } from './use-update-search-params';

export const useUpdateRouteWithParams = () => {
    const updateSearchParams = useUpdateSearchParams();
    const checkSettingsDiff = useCheckSettingsDiff();

    const updateRouteWithParams = (newPathname: string) => {
        const { wbwTr, selectedTranslation } = checkSettingsDiff();
        updateSearchParams(wbwTr || 'en', selectedTranslation || [20], newPathname);
    };

    return updateRouteWithParams;
};