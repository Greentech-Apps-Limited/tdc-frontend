'use client';
import React, { useEffect } from 'react';
import ReadingGoal from './reading-goal';
import StaticWeekCalendar from './static-week-calendar';
import useLastReadStore, { LastReadEntry } from '@/stores/last-read-store';
import useReadingProgressStore from '@/stores/reading-progress-store';

const WeeklyProgress = () => {
  const { weeklyProgress, updateProgress } = useReadingProgressStore();
  const lastReadStore = useLastReadStore();

  useEffect(() => {
    const cleanupOldData = () => {
      const today = new Date();
      const lastSunday = new Date(today);
      lastSunday.setDate(today.getDate() - today.getDay());
      lastSunday.setHours(0, 0, 0, 0);
      const lastSundayStr = lastSunday.toISOString().split('T')[0] || '';
      const oldDataExists = weeklyProgress.some(entry => entry.date < lastSundayStr);
      if (oldDataExists) {
        weeklyProgress.forEach(entry => {
          if (entry.date < lastSundayStr) {
            updateProgress({ date: entry.date, timeSpent: 0, versesRead: 0 });
          }
        });
      }
    };
    cleanupOldData();
  }, [weeklyProgress, updateProgress]);

  const getLatestLastRead = (): LastReadEntry | undefined => {
    const segmentTypes = ['surah', 'juz', 'page', 'hizb', 'ruku'] as const;
    const allEntries = segmentTypes
      .flatMap(segmentType => Object.values(lastReadStore[segmentType]))
      .sort((a, b) => b.timestamp - a.timestamp);
    return allEntries[0];
  };

  const latestLastRead = getLatestLastRead();
  const totalTimeSpentSeconds = weeklyProgress.reduce((sum, day) => sum + day.timeSpent, 0);
  const visitedDays = weeklyProgress
    .filter(entry => entry.timeSpent > 0 || entry.versesRead > 0)
    .map(entry => new Date(entry.date).getDay());

  return (
    <div
      className=" animate-slideInStaggered rounded-2xl border border-neutral-200 p-4 opacity-0 lg:min-w-[500px]"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="flex h-full flex-col gap-6">
        <div
          className="animate-slideInStaggered opacity-0"
          style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
        >
          <StaticWeekCalendar visitedDays={visitedDays} />
        </div>
        <div
          className="animate-slideInStaggered opacity-0"
          style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
        >
          <ReadingGoal timeSpentSeconds={totalTimeSpentSeconds} latestLastRead={latestLastRead} />
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgress;
