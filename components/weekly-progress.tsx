'use client';
import React, { useEffect, useRef, useState } from 'react';

interface GroupStyle {
  left: number;
  width: number;
  top: number;
  height: number;
}

export default function StaticWeekCalendar() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const visitedDays: number[] = [0, 2, 3, 4]; // Pre-set visited days
  const buttonRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [groupStyles, setGroupStyles] = useState<GroupStyle[]>([]);

  const getConsecutiveGroups = (): number[][] => {
    const groups: number[][] = [];
    let currentGroup: number[] = [];
    visitedDays.forEach((day, index) => {
      if (index === 0 || day !== (visitedDays[index - 1] || 0) + 1) {
        if (currentGroup.length > 1) {
          groups.push(currentGroup);
        }
        currentGroup = [day];
      } else {
        currentGroup.push(day);
      }
    });
    if (currentGroup.length > 1) {
      groups.push(currentGroup);
    }
    return groups;
  };

  useEffect(() => {
    const groups = getConsecutiveGroups();
    const calendarElement = buttonRefs.current[0]?.parentElement;
    const calendarRect = calendarElement?.getBoundingClientRect();
    if (calendarRect) {
      const newGroupStyles = groups
        .map(group => {
          const startButton = buttonRefs.current[group[0] || 0];
          const endButton = buttonRefs.current[group[group.length - 1] || 0];
          if (startButton && endButton) {
            const startRect = startButton.getBoundingClientRect();
            const endRect = endButton.getBoundingClientRect();
            return {
              left: startRect.left - calendarRect.left - 2,
              width: endRect.right - startRect.left + 4,
              top: startRect.top - calendarRect.top - 2,
              height: startRect.height + 4,
            };
          }
          return null;
        })
        .filter((style): style is GroupStyle => style !== null);
      setGroupStyles(newGroupStyles);
    }
  }, [getConsecutiveGroups]);

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">This Week</h2>
      <div className="relative flex gap-2  p-[2px]">
        {groupStyles.map((style, groupIndex) => (
          <div
            key={`group-${groupIndex}`}
            className="absolute rounded-full bg-brown-500"
            style={{
              left: `${style.left}px`,
              width: `${style.width}px`,
              top: `${style.top}px`,
              height: `${style.height}px`,
            }}
          />
        ))}
        {days.map((day, index) => {
          const isVisited = visitedDays.includes(index);
          return (
            <div
              key={index}
              ref={(el: HTMLDivElement | null) => {
                buttonRefs.current[index] = el;
              }}
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
}
