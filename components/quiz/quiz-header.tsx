import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExitIcon, HeartReactIconFill, TimerIcon } from '@/icons';
import { formatTime } from '@/lib/utils/audio-utils';

type QuizHeaderProps = {
  life: number;
  timeRemaining: number;
  isTimerCritical: boolean;
  onExit: () => void;
};

const QuizHeader = ({ life, timeRemaining, isTimerCritical, onExit }: QuizHeaderProps) => {
  const [showFallingHeart, setShowFallingHeart] = useState(false);
  const [prevLife, setPrevLife] = useState(life);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (life < prevLife) {
      setShowFallingHeart(true);
      setShake(true);
      setTimeout(() => setShowFallingHeart(false), 1000); // Duration of falling animation
      setTimeout(() => setShake(false), 300); // Duration of shake animation
    }
    setPrevLife(life);
  }, [life, prevLife]);

  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral px-6 py-4">
      <Button size="sm" variant="outline" className="gap-2 rounded-full" onClick={onExit}>
        <ExitIcon />
        <span>Exit</span>
      </Button>
      <div
        className={`flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1 ${
          isTimerCritical ? 'animate-pulse text-red-500' : ''
        }`}
      >
        <TimerIcon className="text-2xl" />
        <span className="text-lg font-semibold">{formatTime(timeRemaining)}</span>
      </div>
      <div
        className={`flex items-center gap-1 rounded-full bg-neutral-100 py-1 pl-3 pr-2
          ${shake ? 'animate-shake' : ''}
          `}
      >
        <span className="text-lg font-semibold">{life}</span>
        <div className="relative">
          <HeartReactIconFill className="text-2xl text-red-500" />
          {showFallingHeart && (
            <HeartReactIconFill className="animate-heart-fall absolute top-0 text-2xl text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;