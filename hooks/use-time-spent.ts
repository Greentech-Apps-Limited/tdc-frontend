import { TimeSpentContext } from "@/contexts/time-spent-context";
import { useContext } from "react";

export const useTimeSpent = () => {
    const context = useContext(TimeSpentContext);
    if (!context) {
        throw new Error('useTimeSpent must be used within a TimeSpentProvider');
    }
    return context;
};
