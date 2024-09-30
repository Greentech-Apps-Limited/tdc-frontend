import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { LevelStartIcon1, LevelStartIcon2, LevelStartIcon3 } from '@/icons';
import useQuizStore from '@/stores/quiz-store';

type LevelData = {
  id: number;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const levels: LevelData[] = [
  { id: 0, name: 'Easy', Icon: LevelStartIcon1 },
  { id: 1, name: 'Medium', Icon: LevelStartIcon2 },
  { id: 2, name: 'Hard', Icon: LevelStartIcon3 },
];

const LevelButton = ({
  level,
  isSelected,
  onClick,
}: {
  level: LevelData;
  isSelected: boolean;
  onClick: () => void;
}) => (
  <Button
    variant="outline"
    className={`h-full w-full flex-col gap-1 p-3 ${isSelected ? 'border-2 border-purple-500' : ''}`}
    onClick={onClick}
  >
    <div>
      <level.Icon className={`h-16 w-24 ${isSelected ? 'text-purple-500' : 'text-neutral-300'}`} />
    </div>
    <p className="text-base font-semibold">{level.name}</p>
  </Button>
);

const LevelSelection = ({
  selectedLevel,
  onLevelSelect,
}: {
  selectedLevel: number;
  onLevelSelect: (level: number) => void;
}) => (
  <div className="flex gap-3">
    {levels.map(level => (
      <LevelButton
        key={level.id}
        level={level}
        isSelected={selectedLevel === level.id}
        onClick={() => onLevelSelect(level.id)}
      />
    ))}
  </div>
);

interface QuizLevelSelectionModalProps {
  onConfirm: (level: number) => void;
  onCancel: () => void;
}

const QuizLevelSelectionModal = ({ onConfirm, onCancel }: QuizLevelSelectionModalProps) => {
  const { selectedLevel, setSelectedLevel } = useQuizStore();

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle>Start Quiz</DialogTitle>
          <DialogDescription>
            Select a difficulty level and let&apos;s see how many questions you can conquer! Choose
            &apos;Hard&apos; to add a higher score.
          </DialogDescription>
        </DialogHeader>
        <div>
          <LevelSelection selectedLevel={selectedLevel} onLevelSelect={setSelectedLevel} />
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={onCancel}>
            Cancel
          </Button>
          <Button className="min-w-48 rounded-full" onClick={() => onConfirm(selectedLevel)}>
            Start Quiz
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizLevelSelectionModal;
