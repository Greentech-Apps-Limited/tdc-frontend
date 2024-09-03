
export type Surah = {
    id: number;
    arabic: string;
    translation: string;
    transliteration: string;
    verses: number;
    revelation: number;
};

export type Reference = {
    id: number,
    surah?: number;
    ayah?: number;
    verse_key?: string;
    surah_name?: string;
    starting_line?: string;
};


export type QuranMeta = {
    surahs: Surah[];
    sajdas?: Reference[];
    rukus: Reference[];
    pages: Reference[];
    manzils?: Reference[];
    hizbs: Reference[];
    juzs: Reference[];
};

export type MappingObjectType = {
    [key: string]: string[];
};