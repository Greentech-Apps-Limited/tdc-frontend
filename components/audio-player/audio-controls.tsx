import {
  DoubleDownChevron,
  PauseIcon,
  PlayCircleIcon,
  SkipNextIcon,
  SkipPreviousIcon,
  StopIcon,
} from '@/icons';
import { memo } from 'react';
import { Button } from '../ui/button';
import useQuranReader from '@/stores/quran-reader-state';
import { formatTime } from '@/lib/utils/audio-utils';

type AudioControlsProps = {
  isPlaying: boolean;
  isLoading: boolean;
  onTogglePlayPause: () => void;
  onSkipBackward: () => void;
  onSkipForward: () => void;
  onStop: () => void;
  currentTime: number;
  duration: number;
};

const AudioControls = ({
  isPlaying,
  isLoading,
  onTogglePlayPause,
  onSkipBackward,
  onSkipForward,
  onStop,
  currentTime,
  duration,
}: AudioControlsProps) => {
  const { autoScroll, setAutoScroll } = useQuranReader();
  const toggleAutoScroll = () => {
    setAutoScroll(autoScroll === 'off' ? 'verse' : 'off');
  };

  return (
    <div className="flex items-center justify-between">
      <div className="min-w-12 text-xs text-neutral-500">{formatTime(currentTime)}</div>
      <div className="flex items-center gap-4">
        <Button
          onClick={toggleAutoScroll}
          variant="ghost"
          className={`h-max w-max rounded-lg p-0.5 ${autoScroll === 'verse' ? 'bg-neutral-100 text-teal-700' : ''}`}
          aria-label="auto scroll"
        >
          <DoubleDownChevron className="text-2xl" />
        </Button>
        <Button
          variant="ghost"
          className="h-max w-max rounded-lg  p-0.5"
          onClick={onSkipBackward}
          aria-label="Skip 10 seconds backward"
        >
          <SkipPreviousIcon className="text-2xl" />
        </Button>
        <Button
          onClick={onTogglePlayPause}
          className="h-max w-max rounded-full bg-neutral-600 p-0.5"
          disabled={isLoading}
          aria-label={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <PauseIcon className="text-2xl" /> : <PlayCircleIcon className="text-2xl" />}
        </Button>
        <Button
          variant="ghost"
          className="h-max w-max rounded-lg  p-0.5"
          onClick={onSkipForward}
          aria-label="Skip 10 seconds forward"
        >
          <SkipNextIcon className="text-2xl" />
        </Button>
        <Button
          variant="ghost"
          className="h-max w-max rounded-lg p-0.5"
          onClick={onStop}
          aria-label="Stop audio"
        >
          <StopIcon className="text-2xl" />
        </Button>
      </div>
      <div className="min-w-12 text-end text-xs text-neutral-500">{formatTime(duration)}</div>
    </div>
  );
};

export default memo(AudioControls);
