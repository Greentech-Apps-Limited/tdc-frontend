import { TranslationItem, VersesTranslationResponse } from "@/lib/types/surah-translation-type";
import { MergedVerse, QuranVerse, QuranVerseDetail, QuranChapterVerses } from "@/lib/types/verses-type";
import { API_BASE_URL, fetcher } from "@/services/api";
import { useEffect, useMemo, useCallback, useRef } from "react";
import useSWRImmutable from 'swr/immutable';

interface UseDedupedFetchVerseProps {
    verseIdx: number;
    chapterId: string;
    translationIds: string[];
    setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
    translationInfos: TranslationItem[];
    initialVerses: MergedVerse[];
    versesPerPage?: number;
    wbwTr: string
    tafseerIds: string[]
}

const getPageNumberFromIndexAndPerPage = (index: number, perPage: number): number =>
    Math.ceil((index + 1) / perPage);

const createRequestKey = (
    chapterId: string,
    pageNumber: number,
    translationIds: string[],
    tafseerIds: string[],
    wbwTr: string
): string =>
    `verses-${chapterId}-${pageNumber}-${translationIds.join(',')}-${tafseerIds.join(',')}-${wbwTr}`;

const createApiUrl = (
    endpoint: string,
    params: Record<string, string | number>
): string => {
    const normalizedEndpoint = endpoint.endsWith('/')
        ? endpoint
        : `${endpoint}/`;

    const searchParams = new URLSearchParams(
        Object.entries(params).map(([key, value]) => [key, value.toString()])
    );
    return `${API_BASE_URL}${normalizedEndpoint}?${searchParams.toString()}`;
};

const useDedupedFetchVerse = ({
    verseIdx,
    chapterId,
    translationIds,
    setApiPageToVersesMap,
    translationInfos,
    initialVerses,
    versesPerPage = 20,
    wbwTr,
    tafseerIds,
}: UseDedupedFetchVerseProps) => {
    const prevPageRef = useRef<number>();

    const pageNumber = getPageNumberFromIndexAndPerPage(verseIdx, versesPerPage);
    const idxInPage = verseIdx % versesPerPage;
    const shouldUseInitialData = pageNumber === 1;

    const mergeVerseWithTranslations = useCallback((
        verse: QuranVerse,
        translationsResponses: VersesTranslationResponse[],
        tafseerResponses: VersesTranslationResponse[]
    ): MergedVerse => {
        const verseTranslations = translationIds.map((id, index) => ({
            info: translationInfos.find(t => t.id === Number(id)),
            text: translationsResponses[index]?.results.find(
                (t: QuranVerseDetail) => t.verse_number === verse.no
            )?.text || '',
        }));

        const verseTafseer = tafseerIds.map((id, index) => ({
            info: translationInfos.find(t => t.id === Number(id)),
            text: tafseerResponses[index]?.results.find(
                (t: QuranVerseDetail) => t.verse_number === verse.no
            )?.text || '',
        }));

        return {
            ...verse,
            combinedTranslations: verseTranslations,
            combinedTafseer: verseTafseer,
        };
    }, [translationIds, tafseerIds, translationInfos]);

    const fetchVerseData = useCallback(async (): Promise<MergedVerse[]> => {
        // Skip fetch if we're already on this page
        if (prevPageRef.current === pageNumber) {
            return [];
        }
        prevPageRef.current = pageNumber;

        const offset = (pageNumber - 1) * versesPerPage;
        const baseParams = {
            chapter_id: chapterId,
            limit: versesPerPage,
            offset,
        };

        try {
            const [versesResponse, ...translationsAndTafseerResponses] = await Promise.all([
                fetcher<QuranChapterVerses>(createApiUrl('/quran/verses/', {
                    ...baseParams,
                    wbw_language: wbwTr
                })),
                ...[...translationIds, ...tafseerIds].map(id =>
                    fetcher<VersesTranslationResponse>(createApiUrl('/quran/translations/' + id, baseParams))
                ),
            ]);

            const translationsResponses = translationsAndTafseerResponses.slice(0, translationIds.length);
            const tafseerResponses = translationsAndTafseerResponses.slice(translationIds.length);

            return versesResponse.results.map(verse =>
                mergeVerseWithTranslations(verse, translationsResponses, tafseerResponses)
            );
        } catch (error) {
            console.error('Error fetching verse data:', error);
            throw error;
        }
    }, [pageNumber, versesPerPage, chapterId, wbwTr, translationIds, tafseerIds, mergeVerseWithTranslations]);

    const fetchKey = shouldUseInitialData
        ? null
        : createRequestKey(chapterId, pageNumber, translationIds, tafseerIds, wbwTr);

    const { data: fetchedData, error } = useSWRImmutable(
        fetchKey,
        fetchVerseData
    );

    const verses = shouldUseInitialData ? initialVerses : fetchedData;

    useEffect(() => {
        if (verses) {
            setApiPageToVersesMap(prev => {
                if (prev[pageNumber] && prev[pageNumber].length > 0) {
                    return prev;
                }
                return {
                    ...prev,
                    [pageNumber]: verses,
                };
            });
        }
    }, [verses, pageNumber, setApiPageToVersesMap]);

    const currentVerse = useMemo(() => verses?.[idxInPage], [verses, idxInPage]);

    return {
        verse: currentVerse,
        isLoading: fetchKey !== null && !verses,
        error,
        pageNumber,
    };
};

export default useDedupedFetchVerse;