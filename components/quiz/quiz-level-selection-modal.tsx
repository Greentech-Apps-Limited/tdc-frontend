import { useTranslations } from 'next-intl';
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
import { useEffect } from 'react';

type LevelData = {
  id: number;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const LevelButton = ({
  level,
  isSelected,
  onClick,
}: {
  level: LevelData;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant="outline"
      className={`h-full w-full flex-col gap-1 p-1 sm:p-3 ${
        isSelected ? 'border-2 border-purple-500' : ''
      }`}
      onClick={onClick}
    >
      <div>
        <level.Icon
          className={`h-10 w-16 sm:h-16 sm:w-24 ${
            isSelected ? 'text-purple-500' : 'text-neutral-300'
          }`}
        />
      </div>
      <p className="break-words text-sm font-semibold sm:text-base">{level.name}</p>
    </Button>
  );
};

const LevelSelection = ({
  selectedLevel,
  onLevelSelect,
}: {
  selectedLevel: number | null;
  onLevelSelect: (level: number) => void;
}) => {
  const t = useTranslations('QuizLevelSelectionModal');
  const levels: LevelData[] = [
    { id: 1, name: t('levels.easy'), Icon: LevelStartIcon1 },
    { id: 2, name: t('levels.medium'), Icon: LevelStartIcon2 },
    { id: 3, name: t('levels.hard'), Icon: LevelStartIcon3 },
  ];

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
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
};

interface QuizLevelSelectionModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const QuizLevelSelectionModal = ({ onConfirm, onCancel }: QuizLevelSelectionModalProps) => {
  const t = useTranslations('QuizLevelSelectionModal');
  const { selectedLevel, setSelectedLevel } = useQuizStore();

  useEffect(() => {
    if (selectedLevel === null) {
      setSelectedLevel(2); // Default to medium (2)
    }
  }, [selectedLevel, setSelectedLevel]);

  const handleConfirm = () => {
    if (selectedLevel !== null) {
      onConfirm();
    }
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="max-w-[95vw] rounded-xl sm:max-w-md">
        <DialogHeader className="space-y-4 sm:space-y-6">
          <DialogTitle className="text-lg sm:text-xl">{t('title')}</DialogTitle>
          <DialogDescription className="text-sm sm:text-base">{t('description')}</DialogDescription>
        </DialogHeader>
        <div className="my-2 sm:my-4">
          <LevelSelection selectedLevel={selectedLevel} onLevelSelect={setSelectedLevel} />
        </div>
        <DialogFooter className="flex-col space-x-2 sm:flex-row sm:space-x-4">
          <Button variant="outline" className="w-full rounded-full sm:w-auto" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button
            className="w-full min-w-0 rounded-full sm:w-auto sm:min-w-48"
            onClick={handleConfirm}
            disabled={selectedLevel === null}
          >
            {t('startQuiz')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default QuizLevelSelectionModal;
