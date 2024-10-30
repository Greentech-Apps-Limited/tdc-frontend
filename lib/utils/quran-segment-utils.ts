import { QuranMeta, Reference, Surah } from "../types/quran-meta-types";
import { QuranSegment } from "../types/quran-segment-type";

const quarterTitles = ['', '¼', '½', '¾'];

export const getHizbTitle = (id: number, t: (key: string) => string, translateNumber: (num: number | string) => string): string => {
    const hizbNumber = Math.ceil(id / 4);
    const quarter = (id - 1) % 4;
    const quarterTitle = quarterTitles[quarter];

    if (quarter === 0) {
        return `${t('hizb')} ${translateNumber(hizbNumber)}`;
    } else {
        // Translate the fraction separately
        const translatedFraction = translateFraction(quarterTitle || '', translateNumber);
        return `${translatedFraction} ${t('hizb')} ${translateNumber(hizbNumber)}`;
    }
};

function translateFraction(fraction: string, translateNumber: (num: number | string) => string): string {
    switch (fraction) {
        case '¼':
            return `${translateNumber(1)}/${translateNumber(4)}`;
        case '½':
            return `${translateNumber(1)}/${translateNumber(2)}`;
        case '¾':
            return `${translateNumber(3)}/${translateNumber(4)}`;
        default:
            return fraction;
    }
}

const titleMap: Record<QuranSegment, (id: number, t: (key: string) => string, translateNumber: (num: number | string) => string) => string> = {
    page: (id, t, translateNumber) => `${t('page')} ${translateNumber(id)}`,
    juz: (id, t, translateNumber) => `${t('juz')} ${translateNumber(id)}`,
    hizb: (id, t, translateNumber) => getHizbTitle(id, t, translateNumber),
    ruku: (id, t, translateNumber) => `${t('ruku')} ${translateNumber(id)}`,
    surah: (id, t, translateNumber) => `${t('surah')} ${translateNumber(id)}`,
};

export const getTitle = (listType: QuranSegment, id: number, t: (key: string) => string, translateNumber: (num: number | string) => string): string => {
    const getTitleFunction = titleMap[listType];
    return getTitleFunction(id, t, translateNumber);
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
