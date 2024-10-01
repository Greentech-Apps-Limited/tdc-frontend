import { Verse } from "./verses-type";
export type VerseTranslation = {
    id: number;
    resource_id: number;
    text: string;
}

export interface VerseWithTranslations extends Verse {
    translations: VerseTranslation[];
}

export type SurahTranslationResponse = {
    verses: VerseWithTranslations[];
    pagination: {
        per_page: number;
        current_page: number;
        next_page: number | null;
        total_pages: number;
        total_records: number;
    };
}


export type TranslationInfo = {
    id: number;
    name: string;
    author_name: string;
    slug: string | null;
    language_name: string;
    translated_name: {
        name: string;
        language_name: string;
    };
};

export type TranslationInfosType = {
    [id: number]: TranslationInfo;
};