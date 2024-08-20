import { QuranMeta, Reference, Surah } from "../types/quran-meta-types";
import { QuranSegment } from "../types/quran-segment-type";

export const getHizbTitle = (id: number): string => {
    const hizbNumber = Math.ceil(id / 4);
    const quarter = (id - 1) % 4;
    const quarterTitles = ['', '1/4', '1/2', '3/4'];
    return quarter === 0 ? `Hizb ${hizbNumber}` : `${quarterTitles[quarter]} Hizb ${hizbNumber}`;
};

const titleMap: Record<QuranSegment, (id: number) => string> = {
    page: (id) => `Page ${id}`,
    juz: (id) => `Juz ${id}`,
    hizb: (id) => getHizbTitle(id),
    ruku: (id) => `Ruku ${id}`,
    surah: (id) => `Surah ${id}`,
};

export const getTitle = (listType: QuranSegment, id: number): string => {
    const getTitleFunction = titleMap[listType];
    return getTitleFunction(id);
};



export const getReferences = (quranMeta: QuranMeta, listType: QuranSegment): Reference[] | Surah[] => {
    const referenceMap: { [key in QuranSegment]: Reference[] | Surah[] } = {
        page: quranMeta.pages,
        juz: quranMeta.juzs,
        hizb: quranMeta.hizbs,
        ruku: quranMeta.rukus,
        surah: quranMeta.surahs,
    };

    return referenceMap[listType] || [];
};