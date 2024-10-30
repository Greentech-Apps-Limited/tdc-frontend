import { useState, useEffect } from 'react';
import useQuizStore from '@/stores/quiz-store';

const useQuizGame = () => {
    const {
        isPlaying,
        timeRemaining,
        life,
        questions,
        selectedAnswer,
        currentQuestionIndex,
        updateTimeRemaining,
        isPaused,
        updateTotalTimeSpent,
        showExitConfirmation,
        nextQuestion,
    } = useQuizStore();

    const [showEndAlert, setShowEndAlert] = useState(false);
    const [showResultModal, setShowResultModal] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);

    const isLastQuestionAnswered =
        currentQuestionIndex === questions.length - 1 && selectedAnswer !== null;

    useEffect(() => {
        let timer: NodeJS.Timeout;

        if (life === 0 || isLastQuestionAnswered) {
            timer = setTimeout(() => setShowEndAlert(true), 1000);
            return () => clearTimeout(timer);
        }

        if (isPlaying && !isPaused && timeRemaining > 0) {
            timer = setInterval(() => {
                updateTimeRemaining(timeRemaining - 1);
                updateTotalTimeSpent();
            }, 1000);
        } else if (timeRemaining === 0) {
            nextQuestion();
        }

        return () => {
            clearInterval(timer);
            clearTimeout(timer);
        };
    }, [
        isPlaying,
        isPaused,
        timeRemaining,
        life,
        isLastQuestionAnswered,
        updateTimeRemaining,
        updateTotalTimeSpent,
        nextQuestion,
    ]);

    return {
        showEndAlert,
        showResultModal,
        showExitModal,
        handleExit: () => showExitConfirmation() && setShowExitModal(true),
        handleEndAlertClose: () => setShowEndAlert(false),
        handleShowResults: () => {
            setShowEndAlert(false);
            setShowResultModal(true);
        },
        handleExitModalClose: () => setShowExitModal(false),
        handleResultModalClose: () => setShowResultModal(false),
    };
};

export default useQuizGame;