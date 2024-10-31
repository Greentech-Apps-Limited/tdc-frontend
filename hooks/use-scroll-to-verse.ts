import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { VirtuosoHandle } from 'react-virtuoso';
import { MergedVerse } from '@/lib/types/verses-type';
import useQuranReader from '@/stores/quran-reader-state';

interface ScrollToVerseConfig {
    verseLookup: string[];
    virtuosoRef: React.RefObject<VirtuosoHandle>;
    initialVerses: MergedVerse[];
}
type VirtuosoBehavior = 'auto' | 'smooth';

const useScrollToVerse = ({ verseLookup, virtuosoRef, initialVerses }: ScrollToVerseConfig) => {
    const searchParams = useSearchParams();
    const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const scrollAttemptRef = useRef<NodeJS.Timeout | null>(null);
    const [shouldReadjustScroll, setShouldReadjustScroll] = useState(false);
    const lastScrolledIndexRef = useRef<number>(-1);

    // Subscribe to relevant audio states from the store
    const isAudioPlaying = useQuranReader((state) => state.isAudioPlaying);
    const highlightedVerse = useQuranReader((state) => state.highlightedVerse);
    const autoScroll = useQuranReader((state) => state.autoScroll);

    const scrollToVerse = (verseKey: string, behavior: VirtuosoBehavior = 'auto') => {
        if (!virtuosoRef.current) return;

        const verseIndex = verseLookup.findIndex((key) => key === verseKey);
        if (verseIndex === -1) return;

        // Don't scroll if we're already at this index
        if (lastScrolledIndexRef.current === verseIndex) return;

        virtuosoRef.current.scrollToIndex({
            index: verseIndex,
            align: 'start',
            behavior,
        });

        lastScrolledIndexRef.current = verseIndex;

        // Handle highlight effect
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

    // Handle audio-based scrolling
    useEffect(() => {
        if (isAudioPlaying && highlightedVerse && autoScroll === 'verse') {
            const targetIndex = verseLookup.findIndex((key) => key === highlightedVerse);
            if (targetIndex === -1) return;

            const behavior = Math.abs(targetIndex - lastScrolledIndexRef.current) < 3 ? 'smooth' : 'auto';
            scrollToVerse(highlightedVerse, behavior);
        }
    }, [isAudioPlaying, highlightedVerse, autoScroll, verseLookup]);

    // Handle URL-based scrolling
    useEffect(() => {
        const verseParam = searchParams.get('verse');
        if (verseParam) {
            const [start, end] = verseParam.split('-');
            const formattedVerse = end ? `${start}:${end}` : `${start}:${start}`;
            scrollToVerse(formattedVerse);
            setShouldReadjustScroll(true);
        }
    }, [searchParams]);

    // Handle readjustment for initial load
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

    // Cleanup
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