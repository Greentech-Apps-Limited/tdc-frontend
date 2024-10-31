'use client';
import { useTranslations } from 'next-intl';

type StaticWeekCalendarProps = {
  visitedDays: number[];
};

const StaticWeekCalendar = ({ visitedDays }: StaticWeekCalendarProps) => {
  const t = useTranslations('WeeklyProgress');
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const BUTTON_SIZE = 24; // 1.5rem = 24px
  const GAP_SIZE = 8; // 0.5rem = 8px
  const TOTAL_ITEM_WIDTH = BUTTON_SIZE + GAP_SIZE;

  const getConsecutiveGroups = (): number[][] => {
    const groups: number[][] = [];
    let currentGroup: number[] = [];
    visitedDays.forEach((day, index) => {
      if (index === 0 || day !== (visitedDays[index - 1] || 0) + 1) {
        if (currentGroup.length > 0) {
          groups.push(currentGroup);
        }
        currentGroup = [day];
      } else {
        currentGroup.push(day);
      }
    });
    if (currentGroup.length > 0) {
      groups.push(currentGroup);
    }
    return groups;
  };

  const consecutiveGroups = getConsecutiveGroups();

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">{t('thisWeek')}</h2>
      <div className="relative flex gap-2">
        {consecutiveGroups.map((group, groupIndex) => (
          <div
            key={`group-${groupIndex}`}
            className="absolute rounded-full bg-brown-500"
            style={{
              left: `${(group[0] || 0) * TOTAL_ITEM_WIDTH - 2}px`,
              width: `${group.length * TOTAL_ITEM_WIDTH - GAP_SIZE + 4}px`,
              top: '-2px',
              height: `${BUTTON_SIZE + 4}px`,
            }}
          />
        ))}
        {days.map((day, index) => {
          const isVisited = visitedDays.includes(index);
          return (
            <div
              key={index}
              className={`
                flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold
                ${
                  isVisited
                    ? 'bg-brown-600 text-white'
                    : 'border border-neutral-200 bg-white text-neutral-700'
                }
                z-10
              `}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaticWeekCalendar;
