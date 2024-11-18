import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ReciterState {
    reciterId: string;
    setReciterId: (id: string) => void;
    resetReciter: () => void;
}

const useReciterStore = create<ReciterState>()(
    persist(
        (set) => ({
            reciterId: '28',
            setReciterId: (id) => set({ reciterId: id }),
            resetReciter: () => set({ reciterId: '28' }),
        }),
        {
            name: 'reciter-storage',
            storage: createJSONStorage(() => localStorage),
            onRehydrateStorage: () => (state) => {
                if (state) {
                    state.resetReciter();
                }
            },
        }
    )
);

export default useReciterStore;