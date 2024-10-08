'use client';

import ReadingGoal from './reading-goal';
import StaticWeekCalendar from './static-week-calendar';

const WeeklyProgress = () => {
  return (
    <div className="w-full max-w-lg rounded-2xl border border-neutral-200 p-4 lg:min-w-[500px]">
      <div className="flex h-full flex-col gap-6">
        <StaticWeekCalendar />
        <ReadingGoal />
      </div>
    </div>
  );
};

export default WeeklyProgress;
