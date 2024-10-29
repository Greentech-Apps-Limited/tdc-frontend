export interface WbwLanguage {
    code: string;
    name: string;
    word_count: number;
}

export interface WbwResponse {
    languages: WbwLanguage[];
    count: number;
}
