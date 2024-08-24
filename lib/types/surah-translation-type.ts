type Translation = {
    id: number;
    resource_id: number;
    text: string;
};

export type SurahTranslation = {
    [verse_number: string]: Translation;
};


export type TranslationInfo = {
    id: number;
    name: string;
    author_name: string;
    slug: string;
    language_name: string;
    translated_name: {
        name: string;
        language_name: string;
    };
};

export type TranslationInfosType = {
    [id: string]: TranslationInfo;
};