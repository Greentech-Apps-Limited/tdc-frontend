import { ReadingProgress, updateWeeklyProgress } from '@/lib/utils/progress-tracking-utils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ReadingProgressState = {
    weeklyProgress: ReadingProgress[];
    updateProgress: (newProgress: ReadingProgress) => void;
};

const useReadingProgressStore = create(
    persist<ReadingProgressState>(
        (set) => ({
            weeklyProgress: [],
            updateProgress: (newProgress) =>
                set((state) => ({
                    weeklyProgress: updateWeeklyProgress(state.weeklyProgress, newProgress),
                })),
        }),
        {
            name: 'reading-progress-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useReadingProgressStore;