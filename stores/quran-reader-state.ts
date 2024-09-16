import { AudioFile } from '@/lib/types/audio';
import { create } from 'zustand';

interface QuranReaderState {
    audioId: number | null;
    showAudioPlayer: boolean;
    highlightedWord: string | null;
    highlightedVerse: string | null;
    audioData: AudioFile | null;
    audioUrl: string;
    autoScroll: 'off' | 'verse';
    currentVerse: string | null;
    setHighlightedWord: (highlightedWord: QuranReaderState['highlightedWord']) => void;
    setHighlightedVerse: (highlightedVerse: QuranReaderState['highlightedVerse']) => void;
    setAudioId: (audioId: QuranReaderState['audioId']) => void;
    setShowAudioPlayer: (show: boolean) => void;
    setAudioData: (data: AudioFile | null) => void;
    setAudioUrl: (url: string) => void;
    setAutoScroll: (mode: QuranReaderState['autoScroll']) => void;
    setCurrentVerse: (verse: string | null) => void;
}

const useQuranReader = create<QuranReaderState>()((set) => ({
    highlightedWord: null,
    highlightedVerse: null,
    audioData: null,
    audioId: null,
    audioUrl: '',
    showAudioPlayer: false,
    autoScroll: 'verse',
    currentVerse: null,
    setAudioId: (audioId: number | null) => set((state) => ({
        audioId,
        showAudioPlayer: audioId !== null ? true : state.showAudioPlayer
    })),
    setHighlightedWord: (highlightedWord) => set({ highlightedWord }),
    setHighlightedVerse: (highlightedVerse) => set({ highlightedVerse }),
    setShowAudioPlayer: (show) => set({ showAudioPlayer: show }),
    setAudioData: (data) => set({ audioData: data }),
    setAudioUrl: (url) => set({ audioUrl: url }),
    setAutoScroll: (mode) => set({ autoScroll: mode }),
    setCurrentVerse: (verse) => set({ currentVerse: verse }),
}));

export default useQuranReader;