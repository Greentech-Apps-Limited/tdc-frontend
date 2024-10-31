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
      className={`h-full w-full flex-col gap-1 p-3 ${isSelected ? 'border-2 border-purple-500' : ''}`}
      onClick={onClick}
    >
      <div>
        <level.Icon
          className={`h-16 w-24 ${isSelected ? 'text-purple-500' : 'text-neutral-300'}`}
        />
      </div>
      <p className="text-base font-semibold">{level.name}</p>
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
    { id: 0, name: t('levels.easy'), Icon: LevelStartIcon1 },
    { id: 1, name: t('levels.medium'), Icon: LevelStartIcon2 },
    { id: 2, name: t('levels.hard'), Icon: LevelStartIcon3 },
  ];

  return (
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
};

interface QuizLevelSelectionModalProps {
  onConfirm: (level: number) => void;
  onCancel: () => void;
}

const QuizLevelSelectionModal = ({ onConfirm, onCancel }: QuizLevelSelectionModalProps) => {
  const t = useTranslations('QuizLevelSelectionModal');
  const { selectedLevel, setSelectedLevel } = useQuizStore();

  const handleConfirm = () => {
    const level = selectedLevel ?? 1;
    setSelectedLevel(level);
    onConfirm(level);
  };

  useEffect(() => {
    if (selectedLevel === null) {
      setSelectedLevel(1);
    }
  }, []);

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader className="space-y-6">
          <DialogTitle>{t('title')}</DialogTitle>
          <DialogDescription>{t('description')}</DialogDescription>
        </DialogHeader>
        <div>
          <LevelSelection selectedLevel={selectedLevel} onLevelSelect={setSelectedLevel} />
        </div>
        <DialogFooter>
          <Button variant="outline" className="rounded-full" onClick={onCancel}>
            {t('cancel')}
          </Button>
          <Button
            className="min-w-48 rounded-full"
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
