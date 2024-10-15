import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ReadingProgress = {
    date: string;
    timeSpent: number;
    versesRead: number;
};

type ReadingProgressState = {
    weeklyProgress: ReadingProgress[];
    updateProgress: (newProgress: Partial<ReadingProgress>) => void;
};

const updateWeeklyProgress = (
    currentProgress: ReadingProgress[],
    newProgress: Partial<ReadingProgress>
): ReadingProgress[] => {
    const today = new Date().toISOString().split('T')[0] || '';
    const existingEntryIndex = currentProgress.findIndex((entry) => entry.date === today);

    if (existingEntryIndex !== -1) {
        return currentProgress.map((entry, index) =>
            index === existingEntryIndex
                ? {
                    ...entry,
                    timeSpent: (entry.timeSpent || 0) + (newProgress.timeSpent || 0),
                    versesRead: (entry.versesRead || 0) + (newProgress.versesRead || 0),
                }
                : entry
        );
    } else {
        return [
            ...currentProgress,
            {
                date: today,
                timeSpent: newProgress.timeSpent || 0,
                versesRead: newProgress.versesRead || 0,
            },
        ];
    }
};

const useReadingProgressStore = create(
    persist<ReadingProgressState>(
        (set) => ({
            weeklyProgress: [],
            updateProgress: (newProgress) =>
                set((state) => {
                    const updatedProgress = updateWeeklyProgress(state.weeklyProgress, newProgress);
                    if (JSON.stringify(state.weeklyProgress) !== JSON.stringify(updatedProgress)) {
                        return { weeklyProgress: updatedProgress };
                    }
                    return state;
                }),
        }),
        {
            name: 'reading-progress-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useReadingProgressStore;