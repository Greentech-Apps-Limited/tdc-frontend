import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type LastReadEntry = {
    surah_id: number;
    ayah_id: number;
    timestamp: number;
    type: 'surah' | 'juz' | 'page' | 'hizb' | 'ruku';
    surah_name?: string;
    total_verses?: number;
};

type LastReadState = {
    entries: LastReadEntry[];
    maxEntries: number;
    updateLastRead: (entry: LastReadEntry) => void;
    setMaxEntries: (count: number) => void;
    clearAllEntries: () => void;
};

const useLastReadStore = create(
    persist<LastReadState>(
        (set) => ({
            entries: [],
            maxEntries: 5,
            updateLastRead: (entry) =>
                set((state) => {
                    const existingIndex = state.entries.findIndex(
                        (e) => e.type === entry.type && e.surah_id === entry.surah_id && e.ayah_id === entry.ayah_id
                    );

                    let newEntries = existingIndex !== -1
                        ? [
                            entry,
                            ...state.entries.slice(0, existingIndex),
                            ...state.entries.slice(existingIndex + 1)
                        ]
                        : [entry, ...state.entries];

                    // Limit to maxEntries
                    newEntries = newEntries.slice(0, state.maxEntries);

                    return { entries: newEntries };
                }),
            setMaxEntries: (count) => set({ maxEntries: count }),
            clearAllEntries: () => set({ entries: [] }),
        }),
        {
            name: 'last-read-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useLastReadStore;