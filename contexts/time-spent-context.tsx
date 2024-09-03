'use client';

import React, { createContext, useState, useEffect, useRef } from 'react';

interface TimeSpentContextType {
  totalTime: number;
  startTimer: () => void;
  stopTimer: () => void;
}

export const TimeSpentContext = createContext<TimeSpentContextType | undefined>(undefined);

export const TimeSpentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [totalTime, setTotalTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (!timerRef.current) {
      timerRef.current = setInterval(() => {
        setTotalTime(prevTime => prevTime + 1);
      }, 1000);
    }
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  return (
    <TimeSpentContext.Provider value={{ totalTime, startTimer, stopTimer }}>
      {children}
    </TimeSpentContext.Provider>
  );
};
