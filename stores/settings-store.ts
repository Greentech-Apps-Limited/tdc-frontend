import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface SettingsState {
    language: string;
    locale: string;
    tafsirLocales: string[];
    prevLocale: string;
    showByWords: boolean;
    showTajweed: boolean;
    showArabic: boolean;
    showTranslation: boolean;
    readingMode: boolean;
    translationFontSize: number;
    selectedTranslation: number[];
    selectedTafseer: number[];
    arabicScript: string;
    arabicFont: string;
    arabicFontSize: number;
    wbwTr: string;
    audioAutoScroll: boolean;
    isAudioPlaying: boolean;
}

export interface SettingsActions {
    updateSettings: (newSettings: Partial<SettingsState>) => void;
    updateWbwTr: (wbwTr: string) => void;
    updateSelectedTranslation: (selectedTranslation: number[]) => void;
    updateSelectedTafseer: (selectedTranslation: number[]) => void;
}

const useSettingsStore = create(
    persist<SettingsState & SettingsActions>(
        (set) => ({
            language: 'English',
            locale: 'en',
            tafsirLocales: ['bn', 'en', 'ar', 'in', 'ru', 'ur'],
            prevLocale: '',
            showByWords: true,
            showTajweed: false,
            showArabic: true,
            showTranslation: true,
            readingMode: false,
            translationFontSize: 16,
            selectedTranslation: [107],
            selectedTafseer: [131],
            arabicScript: 'uthmani',
            arabicFont: 'kfgqpc_hafs',
            arabicFontSize: 28,
            wbwTr: 'en',
            audioAutoScroll: false,
            isAudioPlaying: false,
            updateSettings: (newSettings) => set((state) => ({ ...state, ...newSettings })),
            updateWbwTr: (wbwTr) => set({ wbwTr }),
            updateSelectedTranslation: (selectedTranslation) => set({ selectedTranslation }),
            updateSelectedTafseer: (selectedTafseer) => set({ selectedTafseer }),
        }),
        {
            name: 'settings-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useSettingsStore;