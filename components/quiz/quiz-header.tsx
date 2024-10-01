import { Button } from '@/components/ui/button';
import { ExitIcon, HeartReactIconFill, TimerIcon } from '@/icons';
import useQuizStore from '@/stores/quiz-store';

type QuizHeaderProps = {
  onExit: () => void;
};

const QuizHeader = ({ onExit }: QuizHeaderProps) => {
  const { life, timeRemaining } = useQuizStore();

  return (
    <div className="flex items-center justify-between border-b  border-neutral-200 bg-neutral px-6 py-4">
      <Button size="sm" variant="outline" className="gap-2 rounded-full" onClick={onExit}>
        <ExitIcon />
        <span>Exit</span>
      </Button>
      <div className="flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-1">
        <TimerIcon className="text-2xl" />
        <span className="text-lg font-semibold">{formatTime(timeRemaining)}</span>
      </div>
      <div className="flex items-center gap-1 rounded-full bg-neutral-100 py-1 pl-3 pr-2">
        <span className="text-lg font-semibold">{life}</span>
        <HeartReactIconFill className="text-2xl text-red-500" />
      </div>
    </div>
  );
};

const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default QuizHeader;
