import React, { useEffect, useState } from 'react';
import useQuizStore from '@/stores/quiz-store';
import { Button } from '@/components/ui/button';

const AnswerOptions = () => {
  const {
    currentQuestion,
    answerQuestion,
    selectedAnswer,
    nextQuestion,
    currentOptions,
    setCurrentOptions,
    isReducedOptions,
  } = useQuizStore();

  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (currentQuestion && !isReducedOptions) {
      const options = [
        currentQuestion.right_answer,
        currentQuestion.option_2,
        currentQuestion.option_3,
        currentQuestion.option_4,
      ].filter((option): option is string => typeof option === 'string');

      const shuffledOptions = [...options].sort(() => Math.random() - 0.5);
      setCurrentOptions(shuffledOptions);
    }
  }, [currentQuestion, isReducedOptions, setCurrentOptions]);

  const handleAnswer = (answer: string) => {
    answerQuestion(answer);
    if (answer !== currentQuestion?.right_answer) {
      setShake(true);
      setTimeout(() => setShake(false), 300);
    }
    setTimeout(nextQuestion, 1000);
  };

  const getButtonClass = (option: string) => {
    if (!selectedAnswer) return '';
    if (option === currentQuestion?.right_answer) return 'bg-green-500 text-white';
    if (option === selectedAnswer && option !== currentQuestion?.right_answer)
      return 'bg-red-500 text-white';
    return '';
  };

  if (!currentQuestion) return null;

  return (
    <div className={`relative ${shake ? 'animate-shake' : ''}`}>
      <div className="space-y-2">
        {currentOptions.map((option, index) => (
          <Button
            key={`${currentQuestion.id}-${index}`}
            className={`h-auto min-h-[48px] w-full whitespace-normal break-words px-4 py-3 text-left ${getButtonClass(option)}`}
            variant="outline"
            onClick={() => handleAnswer(option)}
          >
            <span className="block w-full">{option}</span>
          </Button>
        ))}
      </div>
      {selectedAnswer !== null && (
        <div className="absolute inset-0 cursor-not-allowed bg-transparent" />
      )}
    </div>
  );
};

export default AnswerOptions;
