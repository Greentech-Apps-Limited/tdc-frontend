import React from 'react';
import { Button } from '@/components/ui/button';
import { SkipNextIconFill, TimerIconFill } from '@/icons';
import useQuizStore from '@/stores/quiz-store';

const NavigationControls = () => {
  const { pauseQuiz, skipQuestion, reduceOptions, pauseUsed, skipsRemaining, fiftyFiftyUsed } =
    useQuizStore();

  const controls = [
    {
      onClick: () => !pauseUsed && pauseQuiz(),
      icon: <TimerIconFill className="text-2xl text-neutral-500" />,
      disabled: pauseUsed,
      tooltip: 'Pause',
    },
    {
      onClick: skipQuestion,
      icon: <SkipNextIconFill className="text-2xl text-neutral-500" />,
      disabled: skipsRemaining === 0,
      tooltip: 'Skip',
    },
    {
      onClick: reduceOptions,
      icon: <span className="font-bold text-neutral-500">50/50</span>,
      disabled: fiftyFiftyUsed,
      tooltip: '50/50',
    },
  ];

  return (
    <div className="m-auto flex w-max justify-center gap-2 rounded-full border border-neutral-200 bg-neutral p-2 shadow">
      {controls.map((control, index) => (
        <Button
          key={index}
          variant="outline"
          className="h-[56px] w-[56px] rounded-full p-0"
          onClick={control.onClick}
          disabled={control.disabled}
          title={control.tooltip}
        >
          {control.icon}
        </Button>
      ))}
    </div>
  );
};

export default NavigationControls;
