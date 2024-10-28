import { TranslationItem } from "@/lib/types/surah-translation-type";
import { MergedVerse, QuranVerse, QuranVerseDetail } from "@/lib/types/verses-type";
import { API_BASE_URL } from "@/services/api";
import { useEffect, useMemo } from "react";
import useSWRImmutable from 'swr/immutable';

interface UseDedupedFetchVerseProps {
    verseIdx: number;
    chapterId: string;
    translationIds: string[];
    languageCode: string;
    setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>
    translationInfos: TranslationItem[];
    initialVerses: MergedVerse[];
    versesPerPage: number;
}

const getPageNumberFromIndexAndPerPage = (index: number, perPage: number): number => {
    return Math.ceil((index + 1) / perPage);
};

const useDedupedFetchVerse = ({
    verseIdx,
    chapterId,
    translationIds,
    languageCode,
    setApiPageToVersesMap,
    translationInfos,
    initialVerses,
    versesPerPage = 20,
}: UseDedupedFetchVerseProps) => {
    const pageNumber = getPageNumberFromIndexAndPerPage(verseIdx, versesPerPage);
    const idxInPage = verseIdx % versesPerPage;
    const shouldUseInitialData = pageNumber === 1;

    const tafseerIds = useMemo(
        () => translationInfos
            .filter(t => t.has_tafseer)
            .map(t => t.id.toString()),
        [translationInfos]
    );

    const fetchKey = shouldUseInitialData
        ? null
        : `verses-${chapterId}-${pageNumber}-${translationIds.join(',')}-${tafseerIds.join(',')}`;

    const { data: fetchedData } = useSWRImmutable(
        fetchKey,
        async () => {
            const [versesResponse, ...translationsAndTafseerResponses] = await Promise.all([
                fetch(
                    `${API_BASE_URL}/quran/verses/?chapter_id=${chapterId}&language_code=${languageCode}&limit=${versesPerPage}&offset=${(pageNumber - 1) * versesPerPage}`,
                    {
                        headers: {
                            'x-api-token': 'KHY3His3lV89Rky6',
                            'Content-Type': 'application/json',
                        },
                    }
                ).then(res => res.json()),

                ...translationIds.map(id =>
                    fetch(
                        `${API_BASE_URL}/quran/translations/${id}/?chapter=${chapterId}&limit=${versesPerPage}&offset=${(pageNumber - 1) * versesPerPage}`,
                        {
                            headers: {
                                'x-api-token': 'KHY3His3lV89Rky6',
                                'Content-Type': 'application/json',
                            },
                        }
                    ).then(res => res.json())
                ),

                ...tafseerIds.map(id =>
                    fetch(
                        `${API_BASE_URL}/quran/translations/${id}/?chapter=${chapterId}&limit=${versesPerPage}&offset=${(pageNumber - 1) * versesPerPage}`,
                        {
                            headers: {
                                'x-api-token': 'KHY3His3lV89Rky6',
                                'Content-Type': 'application/json',
                            },
                        }
                    ).then(res => res.json())
                ),
            ]);


            const translationsResponses = translationsAndTafseerResponses.slice(0, translationIds.length);
            const tafseerResponses = translationsAndTafseerResponses.slice(translationIds.length);

            const mergedVerses = versesResponse.results.map((verse: QuranVerse) => {
                // Process translations
                const verseTranslations = translationIds.map((id, index) => {
                    const translation = translationsResponses[index]?.results.find(
                        (t: QuranVerseDetail) => t.verse_number === verse.no
                    );
                    const translationInfo = translationInfos.find(t => t.id === Number(id));
                    return {
                        info: translationInfo,
                        text: translation?.text || '',
                    };
                });

                // Process tafseer
                const verseTafseer = tafseerIds.map((id, index) => {
                    const tafseer = tafseerResponses[index]?.results.find(
                        (t: QuranVerseDetail) => t.verse_number === verse.no
                    );
                    const tafseerInfo = translationInfos.find(t => t.id === Number(id));
                    return {
                        info: tafseerInfo,
                        text: tafseer?.text || '',
                    };
                });

                return {
                    ...verse,
                    combinedTranslations: verseTranslations,
                    combinedTafseer: verseTafseer,
                };
            });

            return mergedVerses;
        }
    );

    const verses = shouldUseInitialData ? initialVerses : fetchedData;

    useEffect(() => {
        if (verses) {
            setApiPageToVersesMap((prev) => {
                if (prev[pageNumber]) return prev;
                return {
                    ...prev,
                    [pageNumber]: verses,
                };
            });
        }
    }, [verses, pageNumber, setApiPageToVersesMap]);

    const verse = verses?.[idxInPage];

    return {
        verse,
        isLoading: fetchKey !== null && !verses,
    };
};

export default useDedupedFetchVerse;