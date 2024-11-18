'use client';
import React, { useEffect } from 'react';
import ReadingGoal from './reading-goal';
import StaticWeekCalendar from './static-week-calendar';
import useLastReadStore, { LastReadEntry } from '@/stores/last-read-store';
import useReadingProgressStore from '@/stores/reading-progress-store';
import useQuizProgressStore from '@/stores/quiz-progress-store';
import QuizGoal from './quiz-goal';

const WeeklyProgress = () => {
  const { weeklyQuizzes, cleanOldQuizData } = useQuizProgressStore();
  const { weeklyProgress, removeOldData } = useReadingProgressStore();
  const lastReadStore = useLastReadStore();

  useEffect(() => {
    cleanOldQuizData();
    removeOldData();
  }, []);

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

  const totalParticipatedQuizzes = weeklyQuizzes.reduce(
    (sum, day) => sum + day.quizParticipations,
    0
  );

  return (
    <div
      className=" flex animate-slideInStaggered justify-between rounded-2xl border border-neutral-200 p-4 opacity-0 lg:min-w-[500px]"
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="flex h-full w-full flex-col gap-6">
        <div
          className="animate-slideInStaggered opacity-0"
          style={{ animationDelay: '100ms', animationFillMode: 'forwards' }}
        >
          <StaticWeekCalendar visitedDays={visitedDays} />
        </div>
        <div className="flex flex-col gap-4 md:flex-row">
          <div
            className="w-full animate-slideInStaggered opacity-0"
            style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}
          >
            <ReadingGoal timeSpentSeconds={totalTimeSpentSeconds} latestLastRead={latestLastRead} />
          </div>
          <div
            className="w-full animate-slideInStaggered opacity-0"
            style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}
          >
            <QuizGoal totalParticipatedQuizzes={totalParticipatedQuizzes} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyProgress;
