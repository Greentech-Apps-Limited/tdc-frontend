import { useState } from 'react';
import QuizContainer from './quiz-container';
import QuizHeader from './quiz-header';
import QuestionCard from './question-card';
import AnswerOptions from './answer-options';
import NavigationControls from './navigation-controls';
import useQuizStore from '@/stores/quiz-store';
import ExitConfirmationModal from './exit-confirmation-modal';

const QuizGame = () => {
  const [showExitModal, setShowExitModal] = useState(false);
  const endQuiz = useQuizStore(state => state.endQuiz);

  const handleExit = () => {
    endQuiz();
    setShowExitModal(false);
  };

  return (
    <div>
      <QuizHeader onExit={() => setShowExitModal(true)} />
      <QuizContainer>
        <QuestionCard>
          <AnswerOptions />
        </QuestionCard>
        <NavigationControls />
      </QuizContainer>
      {showExitModal && (
        <ExitConfirmationModal onConfirm={handleExit} onCancel={() => setShowExitModal(false)} />
      )}
    </div>
  );
};

export default QuizGame;
