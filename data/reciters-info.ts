type TranslatedName = {
    name: string;
    language_name: string;
};

type Recitation = {
    id: number;
    reciter_name: string;
    style: string | null;
    translated_name: TranslatedName;
};

export const RECITERS_LIST: Recitation[] = [
    {
        id: 1,
        reciter_name: "AbdulBaset AbdulSamad",
        style: "Mujawwad",
        translated_name: { name: "AbdulBaset AbdulSamad", language_name: "english" }
    },
    {
        id: 3,
        reciter_name: "Abdur-Rahman as-Sudais",
        style: null,
        translated_name: { name: "Abdur-Rahman as-Sudais", language_name: "english" }
    },
    {
        id: 4,
        reciter_name: "Abu Bakr al-Shatri",
        style: null,
        translated_name: { name: "Abu Bakr al-Shatri", language_name: "english" }
    },
    {
        id: 5,
        reciter_name: "Hani ar-Rifai",
        style: null,
        translated_name: { name: "Hani ar-Rifai", language_name: "english" }
    },
    {
        id: 6,
        reciter_name: "Mahmoud Khalil Al-Husary",
        style: null,
        translated_name: { name: "Mahmoud Khalil Al-Husary", language_name: "english" }
    },
    {
        id: 7,
        reciter_name: "Mishari Rashid al-`Afasy",
        style: null,
        translated_name: { name: "Mishari Rashid al-`Afasy", language_name: "english" }
    },
    {
        id: 9,
        reciter_name: "Mohamed Siddiq al-Minshawi",
        style: "Murattal",
        translated_name: { name: "Mohamed Siddiq al-Minshawi", language_name: "english" }
    },
    {
        id: 10,
        reciter_name: "Sa`ud ash-Shuraym",
        style: null,
        translated_name: { name: "Sa`ud ash-Shuraym", language_name: "english" }
    },
    {
        id: 11,
        reciter_name: "Mohamed al-Tablawi",
        style: null,
        translated_name: { name: "Mohamed al-Tablawi", language_name: "english" }
    }
];