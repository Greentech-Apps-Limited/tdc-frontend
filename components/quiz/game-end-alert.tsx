import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Clock, Star } from 'lucide-react';
import useQuizStore from '@/stores/quiz-store';

interface GameEndAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onShowResults: () => void;
}

const GameEndAlert = ({ isOpen, onClose, onShowResults }: GameEndAlertProps) => {
  const { life, questions, correctAnswers, totalTimeSpent } = useQuizStore();
  const isLifeEnded = life === 0;
  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const getMessage = () => {
    if (isLifeEnded) {
      return "Don't worry! Practice makes perfect.";
    }
    if (percentage >= 80) {
      return 'Excellent! MashaAllah!';
    }
    if (percentage >= 60) {
      return 'Good effort! Keep going!';
    }
    return 'In Sha Allah! We will improve next time';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogTitle className="sr-only">
          {isLifeEnded ? 'Quiz Ended' : 'Quiz Completed'}
        </AlertDialogTitle>
        <div className="flex flex-col items-center gap-6 p-4">
          <h2 className="text-2xl font-bold">{isLifeEnded ? 'Quiz Ended' : 'Quiz Completed!'}</h2>
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-neutral-50">
            <AlertDialogDescription
              className={`text-3xl font-bold ${percentage >= 60 ? 'text-green-500' : 'text-brown-500'}`}
            >
              {percentage}%
            </AlertDialogDescription>
            <p className="text-sm text-neutral-600">correct answers</p>
          </div>
          <p className="text-center text-lg text-neutral-600">{getMessage()}</p>
          <div className="flex w-full justify-between gap-4 rounded-lg bg-neutral-50 p-4">
            <div className="flex w-max items-center gap-2">
              <Star className="h-5 w-5 text-brown-500" />
              <span className="font-semibold">
                {correctAnswers}/{totalQuestions}
              </span>
            </div>
            <div className="flex w-max items-center gap-2">
              <Clock className="h-5 w-5 text-brown-500" />
              <span className="font-semibold">{formatTime(totalTimeSpent)}</span>
            </div>
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            <Button variant="outline" className="w-full rounded-full" onClick={onClose}>
              Play Again
            </Button>
            <Button
              className="w-full rounded-full bg-brown-600 hover:bg-brown-500"
              onClick={onShowResults}
            >
              View Results
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GameEndAlert;
