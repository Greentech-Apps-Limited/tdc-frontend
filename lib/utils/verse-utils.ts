export const calculateWbwFontSize = (arabicFontSize: number): number => {
    const minWbwSize = 12;
    const maxWbwSize = 20;
    const minArabicSize = 32;
    const maxArabicSize = 60;

    const proportion = (arabicFontSize - minArabicSize) / (maxArabicSize - minArabicSize);

    const wbwSize = minWbwSize + proportion * (maxWbwSize - minWbwSize);

    return Math.max(minWbwSize, Math.min(maxWbwSize, Math.round(wbwSize)));
};

export const generateVerseKeys = (surahId: number, totalVerses: number): string[] => {
    return Array.from({ length: totalVerses }, (_, index) => `${surahId}:${index + 1}`);
};

export const formatVerseNumber = (verseNumber?: string): string => {
    if (!verseNumber) return '';

    const num = parseInt(verseNumber, 10);
    if (isNaN(num)) return '';
    if (num < 10) return `0${num}`;
    if (num < 100) return `${num}`.padStart(2, '0');
    return `${num}`;
};

export const QuranConstants = {
    MIN_AYAH_ID: 1,
    MAX_AYAH_ID: 6236,
    FIRST_SURA: 1,
    LAST_SURA: 114,
} as const;

export const VERSES_PER_SURAH: readonly number[] = [
    7, 286, 200, 176, 120, 165, 206, 75, 129, 109, 123, 111, 43, 52, 99, 128,
    111, 110, 98, 135, 112, 78, 118, 64, 77, 227, 93, 88, 69, 60, 34, 30,
    73, 54, 45, 83, 182, 88, 75, 85, 54, 53, 89, 59, 37, 35, 38, 29, 18,
    45, 60, 49, 62, 55, 78, 96, 29, 22, 24, 13, 14, 11, 11, 18, 12, 12,
    30, 52, 52, 44, 28, 28, 20, 56, 40, 31, 50, 40, 46, 42, 29, 19, 36,
    25, 22, 17, 19, 26, 30, 20, 15, 21, 11, 8, 8, 19, 5, 8, 8, 11, 11,
    8, 3, 9, 5, 4, 7, 3, 6, 3, 5, 4, 5, 6
];


export const SURA_ID_START = VERSES_PER_SURAH.reduce<number[]>((acc, _, index) => {
    if (index === 0) return [1];
    const prev = acc[index - 1];
    const verses = VERSES_PER_SURAH[index - 1];
    if (prev === undefined || verses === undefined) return acc;
    acc.push(prev + verses);
    return acc;
}, [] as number[]);

export function binarySearch(target: number, start: number, end: number): number {
    while (start <= end) {
        const mid = Math.floor((start + end) / 2);
        const midStart = SURA_ID_START[mid - 1];
        const nextStart = mid < 114 ? SURA_ID_START[mid] : QuranConstants.MAX_AYAH_ID + 1;

        if (midStart === undefined) return 1;
        if (nextStart === undefined) return 1;

        if (target >= midStart && target < nextStart) {
            return mid;
        }
        if (target < midStart) {
            end = mid - 1;
        } else {
            start = mid + 1;
        }
    }
    return 1;
}

export function getSurahAyahFromId(surahAyahID: number): { surah: number; ayah: number; } {
    if (
        surahAyahID > QuranConstants.MAX_AYAH_ID ||
        surahAyahID < QuranConstants.MIN_AYAH_ID
    ) {
        return { surah: 1, ayah: 1 };
    }

    const lastSurahStart = SURA_ID_START[QuranConstants.LAST_SURA - 1];
    if (lastSurahStart === undefined) return { surah: 1, ayah: 1 };

    let foundSurah: number;
    let foundAyah: number;

    if (surahAyahID > lastSurahStart) {
        foundSurah = 114;
        foundAyah = surahAyahID - lastSurahStart + 1;
    } else {
        foundSurah = binarySearch(
            surahAyahID,
            QuranConstants.FIRST_SURA,
            QuranConstants.LAST_SURA
        );
        const surahStart = SURA_ID_START[foundSurah - 1];
        if (surahStart === undefined) return { surah: 1, ayah: 1 };
        foundAyah = surahAyahID - surahStart + 1;
    }

    return { surah: foundSurah, ayah: foundAyah };
}

export function getIdFromSurahAyah(surah: number, ayah: number): number {
    const versesInSurah = VERSES_PER_SURAH[surah - 1];
    if (
        versesInSurah === undefined ||
        surah < 1 ||
        surah > 114 ||
        ayah < 1 ||
        ayah > versesInSurah
    ) {
        return 1;
    }

    const surahStart = SURA_ID_START[surah - 1];
    if (surahStart === undefined) return 1;

    return surahStart + (ayah - 1);
}