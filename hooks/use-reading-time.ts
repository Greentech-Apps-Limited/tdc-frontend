import useReadingProgressStore from '@/stores/reading-progress-store';
import { useState, useEffect, useRef, useCallback } from 'react';

type UseReadingTimeResult = {
    timeSpent: number;
    isReading: boolean;
};

const useReadingTime = (): UseReadingTimeResult => {
    const [timeSpent, setTimeSpent] = useState<number>(0);
    const [isReading, setIsReading] = useState<boolean>(true);
    const intervalRef = useRef<number | null>(null);
    const startTimeRef = useRef<number>(Date.now());
    const accumulatedTimeRef = useRef<number>(0);
    const { updateProgress } = useReadingProgressStore();

    const updateStore = useCallback((time: number) => {
        const today = new Date().toISOString().split('T')[0];
        updateProgress({ date: today, timeSpent: time });
    }, [updateProgress]);

    const calculateElapsedTime = useCallback(() => {
        const now = Date.now();
        const elapsedTime = Math.floor((now - startTimeRef.current) / 1000);
        updateStore(elapsedTime);
        accumulatedTimeRef.current += elapsedTime;
        startTimeRef.current = now;
        return accumulatedTimeRef.current;
    }, [updateStore]);

    const stopTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            const finalTime = calculateElapsedTime();
            setTimeSpent(finalTime);
        }
    }, [calculateElapsedTime]);

    const startTimer = useCallback(() => {
        if (intervalRef.current === null) {
            startTimeRef.current = Date.now();
            intervalRef.current = window.setInterval(() => {
                const currentTime = calculateElapsedTime();
                setTimeSpent(currentTime);
            }, 1000);
        }
    }, [calculateElapsedTime]);

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden || !navigator.onLine) {
                setIsReading(false);
                stopTimer();
            } else {
                setIsReading(true);
                startTimer();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        if (!document.hidden) {
            startTimer();
        }

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            stopTimer();
        };
    }, [startTimer, stopTimer]);

    return { timeSpent, isReading };
};

export default useReadingTime;
