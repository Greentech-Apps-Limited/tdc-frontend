import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { VirtuosoHandle } from 'react-virtuoso';
import { MergedVerse } from '@/lib/types/verses-type';

interface ScrollToVerseConfig {
    verseLookup: string[];
    virtuosoRef: React.RefObject<VirtuosoHandle>;
    initialVerses: MergedVerse[];
}

const useScrollToVerse = ({ verseLookup, virtuosoRef, initialVerses }: ScrollToVerseConfig) => {
    const searchParams = useSearchParams();
    const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollAttemptRef = useRef<NodeJS.Timeout | null>(null);
    const [shouldReadjustScroll, setShouldReadjustScroll] = useState(false);
    const maxAttempts = 5; // Maximum number of scroll attempts
    const attemptIntervalMs = 200; // Time between attempts

    const scrollToVerse = (verseKey: string, attempt = 0) => {
        // Clear any existing scroll attempt
        if (scrollAttemptRef.current) {
            clearTimeout(scrollAttemptRef.current);
        }

        // Find the index of the verse in the lookup array
        const verseIndex = verseLookup.findIndex((key) => key === verseKey);

        if (verseIndex === -1) {
            return; // Verse not found in lookup
        }

        if (!virtuosoRef.current && attempt < maxAttempts) {
            // If virtuoso ref is not ready yet, try again after a delay
            scrollAttemptRef.current = setTimeout(() => {
                scrollToVerse(verseKey, attempt + 1);
            }, attemptIntervalMs);
            return;
        }

        if (!virtuosoRef.current) {
            console.warn('Virtuoso ref not available after maximum attempts');
            return;
        }

        virtuosoRef.current.scrollToIndex({
            index: verseIndex,
            align: 'start',
            behavior: 'auto',
            offset: 25,
        });

        setShouldReadjustScroll(true);

        setTimeout(() => {
            const highlightedElement = document.querySelector(
                `[data-verse="${verseKey}"]`
            ) as HTMLElement;

            if (highlightedElement) {
                highlightedElement.style.transition = 'background-color 0.5s ease-in-out';
                highlightedElement.style.backgroundColor = '#F9F5F1';

                if (highlightTimeoutRef.current) {
                    clearTimeout(highlightTimeoutRef.current);
                }

                highlightTimeoutRef.current = setTimeout(() => {
                    highlightedElement.style.backgroundColor = '';
                }, 2000);
            }
        }, 100);
    };


    useEffect(() => {
        const verseParam = searchParams.get('verse');

        if (verseParam) {
            const [start, end] = verseParam.split('-');
            const formattedVerse = end ? `${start}:${end}` : `${start}:${start}`;
            scrollToVerse(formattedVerse);
        }
    }, [searchParams]);

    useEffect(() => {
        if (shouldReadjustScroll && initialVerses.length > 0) {
            const verseParam = searchParams.get('verse');

            if (verseParam) {
                const [start, end] = verseParam.split('-');
                const formattedVerse = end ? `${start}:${end}` : `${start}:${start}`;


                setTimeout(() => {
                    scrollToVerse(formattedVerse);
                    setShouldReadjustScroll(false);
                }, 100);
            }
        }
    }, [shouldReadjustScroll, initialVerses, searchParams]);


    useEffect(() => {
        return () => {
            if (highlightTimeoutRef.current) {
                clearTimeout(highlightTimeoutRef.current);
            }
            if (scrollAttemptRef.current) {
                clearTimeout(scrollAttemptRef.current);
            }
        };
    }, []);

    return scrollToVerse;
};

export default useScrollToVerse;