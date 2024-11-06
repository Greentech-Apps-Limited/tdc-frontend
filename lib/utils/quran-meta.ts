// @/lib/utils/metadata-loader.ts
import { QuranSegment } from '@/lib/types/quran-segment-type';

export const loadQuranMetadata = async (segment: QuranSegment) => {
    switch (segment) {
        case 'surah':
            return import('@/data/quran-meta/surahs/en').then(m => m.SURAH_EN);
        case 'page':
            return import('@/data/quran-meta/pages').then(m => m.PAGES);
        case 'juz':
            return import('@/data/quran-meta/juzs').then(m => m.JUZS);
        case 'hizb':
            return import('@/data/quran-meta/hizbs').then(m => m.HIZBS);
        case 'ruku':
            return import('@/data/quran-meta/rukus').then(m => m.RUKUS);
        default:
            return null;
    }
};