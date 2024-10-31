import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface ReciterState {
    reciterId: string;
    setReciterId: (id: string) => void;
}

const useReciterStore = create<ReciterState>()(
    persist(
        (set) => ({
            reciterId: '7',
            setReciterId: (id) => set({ reciterId: id }),
        }),
        {
            name: 'reciter-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useReciterStore;