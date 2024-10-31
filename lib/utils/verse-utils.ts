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