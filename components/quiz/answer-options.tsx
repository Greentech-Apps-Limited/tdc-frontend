import React, { useMemo } from 'react';
import useQuizStore from '@/stores/quiz-store';
import { Button } from '../ui/button';

const AnswerOptions: React.FC = () => {
  const { currentQuestion, answerQuestion } = useQuizStore();

  const options = useMemo(() => {
    if (!currentQuestion) return [];
    return [
      currentQuestion.right_answer,
      currentQuestion.option_2,
      currentQuestion.option_3,
      currentQuestion.option_4,
    ].sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  if (!currentQuestion) return null;

  return (
    <div className="space-y-2">
      {options.map((option, index) => (
        <Button
          key={`${currentQuestion.id}-${index}`}
          className="w-full justify-start text-left"
          variant="outline"
          onClick={() => answerQuestion(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default AnswerOptions;
