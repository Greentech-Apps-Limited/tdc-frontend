export type ReadingProgress = {
    date?: string;
    timeSpent: number;
};


export const updateWeeklyProgress = (
    currentProgress: ReadingProgress[],
    newProgress: ReadingProgress
): ReadingProgress[] => {
    const today = new Date().toISOString().split('T')[0];
    const updatedProgress = [...currentProgress];
    const existingEntry = updatedProgress.find((p) => p.date === today);

    if (existingEntry) {
        existingEntry.timeSpent = (existingEntry.timeSpent || 0) + (newProgress.timeSpent || 0);
    } else {

        updatedProgress.push({
            date: today,
            timeSpent: newProgress.timeSpent || 0,
        });
    }

    return updatedProgress.slice(-7);
};

