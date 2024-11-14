import { isBeforeLastSunday } from '@/lib/utils/common-utils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type ReadingProgress = {
    date: string;
    timeSpent: number;
    versesRead: number;
};

type ReadingProgressState = {
    weeklyProgress: ReadingProgress[];
    lifetimeTotals: {
        totalTimeSpent: number;
        totalVersesRead: number;
    };
    updateProgress: (newProgress: Partial<ReadingProgress>) => void;
    removeOldData: () => void;
};

const updateWeeklyProgress = (
    currentProgress: ReadingProgress[],
    newProgress: Partial<ReadingProgress>
): ReadingProgress[] => {
    const today = new Date().toISOString().split('T')[0] || '';
    const existingEntryIndex = currentProgress.findIndex((entry) => entry.date === today);

    // If we find today's entry, update it
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
    }

    return [
        ...currentProgress,
        {
            date: today,
            timeSpent: newProgress.timeSpent || 0,
            versesRead: newProgress.versesRead || 0,
        },
    ];
};

const useReadingProgressStore = create(
    persist<ReadingProgressState>(
        (set) => ({
            weeklyProgress: [],
            lifetimeTotals: {
                totalTimeSpent: 0,
                totalVersesRead: 0,
            },
            updateProgress: (newProgress) =>
                set((state) => {
                    const updatedProgress = updateWeeklyProgress(state.weeklyProgress, newProgress);

                    if (JSON.stringify(state.weeklyProgress) !== JSON.stringify(updatedProgress)) {
                        return {
                            weeklyProgress: updatedProgress,
                            lifetimeTotals: {
                                totalTimeSpent: state.lifetimeTotals.totalTimeSpent + (newProgress.timeSpent || 0),
                                totalVersesRead: state.lifetimeTotals.totalVersesRead + (newProgress.versesRead || 0),
                            },
                        };
                    }
                    return state;
                }),

            removeOldData: () =>
                set((state) => ({
                    weeklyProgress: state.weeklyProgress.filter((entry) => !isBeforeLastSunday(entry.date)),
                })),
        }),
        {
            name: 'reading-progress-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useReadingProgressStore;