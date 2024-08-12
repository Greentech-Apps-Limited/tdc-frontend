
type Surah = {
    id: number;
    arabic: string;
    translation: string;
    transliteration: string;
    verses: number;
    revelation: number;
};

type Reference = {
    surah?: number;
    ayah?: number;
    juz_verse_key?: string;
    surah_name?: string;
    starting_line?: string;
};

type ReferenceObject = {
    count: number;
    references: Reference[];
};

export type QuranMeta = {
    surahs: Surah[];
    sajdas: ReferenceObject;
    rukus: ReferenceObject;
    pages: ReferenceObject;
    manzils: ReferenceObject;
    hizbQuarters: ReferenceObject;
    juzs: ReferenceObject;
};
