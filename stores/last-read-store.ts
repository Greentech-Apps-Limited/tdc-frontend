import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export type LastReadEntry = {
    surah_id: number;
    ayah_id: number;
    timestamp: number;
    type: 'surah' | 'juz' | 'page' | 'hizb' | 'ruku';
    segment_id?: number; // For page, juz, hizb, ruku
    surah_name?: string;
    total_verses?: number;
};

type LastReadSegmentEntries = {
    [key: string]: LastReadEntry;
};

type QuranSegmentType = 'surah' | 'juz' | 'page' | 'hizb' | 'ruku';

type LastReadState = {
    surah: LastReadSegmentEntries;
    juz: LastReadSegmentEntries;
    page: LastReadSegmentEntries;
    hizb: LastReadSegmentEntries;
    ruku: LastReadSegmentEntries;
    maxEntriesPerSegment: number;
    updateLastRead: (entry: LastReadEntry) => void;
    setMaxEntriesPerSegment: (count: number) => void;
    clearAllEntries: () => void;
    getLastReadForSegment: (segmentType: QuranSegmentType, segmentId: string) => LastReadEntry | undefined;
};

const useLastReadStore = create(
    persist<LastReadState>(
        (set, get) => ({
            surah: {},
            juz: {},
            page: {},
            hizb: {},
            ruku: {},
            maxEntriesPerSegment: 5,
            updateLastRead: (entry) =>
                set((state) => {
                    const { type } = entry;
                    const segmentId = entry.type === 'surah' ? entry.surah_id.toString() : entry.segment_id?.toString();

                    if (!segmentId) {
                        console.error('Invalid segment ID');
                        return state;
                    }

                    const newState = { ...state };
                    newState[type] = { ...newState[type], [segmentId]: entry };

                    // Limit entries per segment type
                    const entries = Object.entries(newState[type]);
                    if (entries.length > state.maxEntriesPerSegment) {
                        const sortedEntries = entries.sort((a, b) => b[1].timestamp - a[1].timestamp);
                        newState[type] = Object.fromEntries(sortedEntries.slice(0, state.maxEntriesPerSegment));
                    }

                    return newState;
                }),
            setMaxEntriesPerSegment: (count) => set({ maxEntriesPerSegment: count }),
            clearAllEntries: () => set({ surah: {}, juz: {}, page: {}, hizb: {}, ruku: {} }),
            getLastReadForSegment: (segmentType, segmentId) => {
                const state = get();
                return state[segmentType][segmentId];
            },
        }),
        {
            name: 'last-read-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useLastReadStore;