import { QuranVerseDetail } from "./verses-type";

export type VersesTranslationResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: QuranVerseDetail[];
};



export interface TranslationItem {
    id: number;
    name: string;
    author_name: string;
    language: string;
    short_info: string;
    has_tafseer: boolean;
}
export interface TranslationResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: TranslationItem[];
}