import { TranslationItem } from "./surah-translation-type";


type QuranWord = {
    id: number;
    no: number;
    text_uthmani: string;
    text_indopak: string;
    translation?: string | null;
    transliteration?: string | null;
};

type QuranVerse = {
    id: number;
    no: number;
    chapter: number;
    verse_key: string;
    juz_number: number;
    hizb_number: number;
    rub_number: number;
    ruku_number: number;
    sajdah_number?: number | null;
    page_number: number;
    text_uthmani: string;
    text_indopak: string;
    words: QuranWord[];
};

type QuranChapterVerses = {
    count: number;
    next?: string | null;
    previous?: string | null;
    results: QuranVerse[];
};

type QuranVerseDetail = {
    verse_number: number;
    verse_key: string;
    text: string;
    footnote: string;
};


type MergedVerse = QuranVerse & {
    combinedTranslations?: {
        info?: TranslationItem;
        text: string;
    }[];
};

export type { MergedVerse, QuranChapterVerses, QuranVerse, QuranWord, QuranVerseDetail };