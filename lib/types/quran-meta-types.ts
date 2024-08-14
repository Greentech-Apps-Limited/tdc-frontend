
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

export type ReferenceObject = {
    count: number;
    references: Reference[];
};

export type QuranMeta = {
    surahs: {
        count: number;
        references: Surah[]
    };
    sajdas: ReferenceObject;
    rukus: ReferenceObject;
    pages: ReferenceObject;
    manzils: ReferenceObject;
    hizbQuarters: ReferenceObject;
    juzs: ReferenceObject;
};
