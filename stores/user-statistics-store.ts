import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type IntervalID = ReturnType<typeof setInterval>;

export interface UserStatisticsState {
    totalTime: number;
    lastSessionStartTime: number | null;
    intervalId: IntervalID | null;
    // Add more statistics here in the future, for example:
    // totalSessions: number;
    // averageSessionTime: number;
}

export interface UserStatisticsActions {
    startTimer: () => void;
    stopTimer: () => void;
    resetTotalTime: () => void;
    // Add more actions here in the future
}

type UserStatisticsStore = UserStatisticsState & UserStatisticsActions;

const useUserStatisticsStore = create(
    persist<UserStatisticsStore>(
        (set, get) => ({
            totalTime: 0,
            lastSessionStartTime: null,
            intervalId: null,

            startTimer: () => {
                const now = Date.now();
                const intervalId = setInterval(() => {
                    set((state) => ({ totalTime: state.totalTime + 1 }));
                }, 1000);
                set({ lastSessionStartTime: now, intervalId });
            },

            stopTimer: () => {
                const { intervalId, lastSessionStartTime } = get();
                if (intervalId) {
                    clearInterval(intervalId);
                    set({ intervalId: null });
                }
                if (lastSessionStartTime) {
                    const sessionDuration = Math.floor((Date.now() - lastSessionStartTime) / 1000);
                    set((state) => ({
                        totalTime: state.totalTime + sessionDuration,
                        lastSessionStartTime: null,
                    }));
                }
            },

            resetTotalTime: () => set({ totalTime: 0, lastSessionStartTime: null, intervalId: null }),
        }),
        {
            name: 'user-statistics-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                totalTime: state.totalTime,
                lastSessionStartTime: state.lastSessionStartTime,
                // We don't persist intervalId as it's not serializable and will be recreated on page load
            }),
        }
    )
);

export default useUserStatisticsStore;