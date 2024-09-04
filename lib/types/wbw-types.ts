import { Pagination } from "./verses-type";

type Translation = {
    text: string;
    language_name: string;
};

type Transliteration = {
    text: string | null;
    language_name: string;
};

type Word = {
    id: number;
    position: number;
    char_type_name: string;
    text_uthmani: string;
    location: string;
    page_number: number;
    line_number: number;
    text: string;
    translation: Translation;
    transliteration: Transliteration;
};

type WbwVerse = {
    id: number;
    verse_number: number;
    verse_key: string;
    hizb_number: number;
    rub_el_hizb_number: number;
    ruku_number: number;
    manzil_number: number;
    sajdah_number: number | null;
    page_number: number;
    juz_number: number;
    words: Word[];
};

type WbwVersesResponse = {
    verses: WbwVerse[];
    pagination: Pagination;
}


export type { WbwVersesResponse, WbwVerse, Translation, Transliteration, Word };