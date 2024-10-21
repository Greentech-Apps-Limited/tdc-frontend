import { useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/routing';
import { QuranSegment } from '@/lib/types/quran-segment-type';

export const useUpdateSearchParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const isValidPath = (path: string): boolean => {
        if (path === '/') return true;

        const segments = path.split('/').filter(Boolean);
        if (segments.length < 2) return false;

        const validSegments: QuranSegment[] = ['surah', 'page', 'juz', 'hizb', 'ruku'];
        return validSegments.includes(segments[0] as QuranSegment);
    };

    const updateSearchParams = useCallback((wbwTr: string, selectedTranslation: number[]) => {
        if (!isValidPath(pathname)) return;

        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('wbw_tr', wbwTr);
        newParams.set('translations', selectedTranslation.join('-'));
        router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }, [router, pathname, searchParams]);

    return updateSearchParams;
};