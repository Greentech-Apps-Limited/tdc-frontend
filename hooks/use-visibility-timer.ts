'use client';

import { useEffect } from 'react';
import { useTimeSpent } from './use-time-spent';

const useVisibilityTimer = () => {
    const { startTimer, stopTimer } = useTimeSpent();

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                stopTimer();
            } else {
                startTimer();
            }
        };
        startTimer();
        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            stopTimer();
        };
    }, [startTimer, stopTimer]);
};

export default useVisibilityTimer;
