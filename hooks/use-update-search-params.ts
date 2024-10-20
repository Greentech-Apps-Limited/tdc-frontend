import { useCallback } from 'react';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';

export const useUpdateSearchParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const updateSearchParams = useCallback((wbwTr: string, selectedTranslation: number[]) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('wbw_tr', wbwTr);
        newParams.set('translations', selectedTranslation.join('-'));

        router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }, [router, pathname, searchParams]);

    return updateSearchParams;
};