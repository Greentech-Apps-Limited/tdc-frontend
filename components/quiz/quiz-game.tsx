import { useRouter } from '@/i18n/routing';
import QuizHeader from './quiz-header';
import QuestionCard from './question-card';
import AnswerOptions from './answer-options';
import NavigationControls from './navigation-controls';
import QuizContainer from './quiz-container';
import GameEndAlert from './game-end-alert';
import GameResultModal from './game-result-modal';
import ExitConfirmationModal from './exit-confirmation-modal';
import useQuizGame from '@/hooks/use-guiz-game';
import { resetAllStores } from '@/stores/quiz-store';

const QuizGame = () => {
  const router = useRouter();
  const {
    showEndAlert,
    showResultModal,
    showExitModal,
    handleExit,
    handleShowResults,
    handleExitModalClose,
  } = useQuizGame();

  const handleFinishGame = () => {
    router.push('/quiz');
    setTimeout(() => resetAllStores(), 200);
  };

  return (
    <div>
      <QuizHeader onExit={handleExit} />
      <QuizContainer>
        <QuestionCard>
          <AnswerOptions />
        </QuestionCard>
        <NavigationControls />
      </QuizContainer>

      <GameEndAlert
        isOpen={showEndAlert}
        onClose={handleFinishGame}
        onShowResults={handleShowResults}
      />

      <GameResultModal isOpen={showResultModal} onClose={handleFinishGame} />

      <ExitConfirmationModal
        onConfirm={handleFinishGame}
        onCancel={handleExitModalClose}
        isOpen={showExitModal}
      />
    </div>
  );
};

export default QuizGame;
