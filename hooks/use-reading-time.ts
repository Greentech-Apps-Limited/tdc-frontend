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
    const lastUpdateTimeRef = useRef<number>(Date.now());
    const { updateProgress } = useReadingProgressStore();

    const updateStore = useCallback((incrementalTime: number) => {
        const today = new Date().toISOString().split('T')[0];
        console.log("incrementalTime", incrementalTime)
        updateProgress({ date: today, timeSpent: incrementalTime });
    }, [updateProgress]);

    const calculateElapsedTime = useCallback(() => {
        const now = Date.now();
        const incrementalTime = Math.floor((now - lastUpdateTimeRef.current) / 1000);
        lastUpdateTimeRef.current = now;
        return incrementalTime;
    }, []);

    const stopTimer = useCallback(() => {
        if (intervalRef.current !== null) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
            const incrementalTime = calculateElapsedTime();
            setTimeSpent(prevTime => prevTime + incrementalTime);
            updateStore(incrementalTime);
        }
    }, [calculateElapsedTime, updateStore]);

    const startTimer = useCallback(() => {
        if (intervalRef.current === null) {
            startTimeRef.current = Date.now();
            lastUpdateTimeRef.current = Date.now();
            intervalRef.current = window.setInterval(() => {
                const incrementalTime = calculateElapsedTime();
                setTimeSpent(prevTime => prevTime + incrementalTime);
                updateStore(incrementalTime);
            }, 1000);
        }
    }, [calculateElapsedTime, updateStore]);

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