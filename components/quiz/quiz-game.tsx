import React, { useEffect, useState } from 'react';
import useQuizStore from '@/stores/quiz-store';
import QuizHeader from './quiz-header';
import QuestionCard from './question-card';
import AnswerOptions from './answer-options';
import NavigationControls from './navigation-controls';
import ExitConfirmationModal from './exit-confirmation-modal';
import QuizContainer from './quiz-container';

const QuizGame = () => {
  const {
    isPlaying,
    showResults,
    timeRemaining,
    life,
    isTimerCritical,
    updateTimeRemaining,
    nextQuestion,
    showExitConfirmation,
    isPaused,
  } = useQuizStore();

  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && !showResults && !isPaused && timeRemaining > 0) {
      timer = setInterval(() => {
        updateTimeRemaining(timeRemaining - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      nextQuestion();
    }
    return () => clearInterval(timer);
  }, [isPlaying, showResults, isPaused, timeRemaining, updateTimeRemaining, nextQuestion]);

  const handleExit = () => {
    if (showExitConfirmation()) {
      setShowExitModal(true);
    }
  };

  return (
    <div>
      <QuizHeader
        life={life}
        timeRemaining={timeRemaining}
        isTimerCritical={isTimerCritical}
        onExit={handleExit}
      />
      <QuizContainer>
        <QuestionCard>
          <AnswerOptions />
        </QuestionCard>
        <NavigationControls />
      </QuizContainer>
      {showExitModal && (
        <ExitConfirmationModal
          onConfirm={() => {
            // Handle exit confirmation
            setShowExitModal(false);
          }}
          onCancel={() => setShowExitModal(false)}
        />
      )}
    </div>
  );
};

export default QuizGame;
