import { useCallback } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

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