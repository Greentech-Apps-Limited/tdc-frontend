/* eslint-disable @typescript-eslint/no-unused-vars */
import { Question } from '@/lib/types/quiz-types';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface QuizState {
    life: number;
    isPlaying: boolean;
    quizzesPlayed: number;
    timeRemaining: number;
    correctAnswers: number;
    totalQuestions: number;
    currentQuestionIndex: number;
    highScore: number;
    questions: Question[];
    currentQuestion: Question | null;
    isPaused: boolean;
    skipsRemaining: number;
    reducedOptionsUsed: boolean;
}

interface QuizActions {
    startQuiz: (questions: Question[]) => void;
    endQuiz: () => void;
    decreaseLife: () => void;
    resetLife: () => void;
    answerQuestion: (answer: string) => void;
    nextQuestion: () => void;
    updateTimeRemaining: (time: number) => void;
    updateHighScore: (score: number) => void;
    pauseQuiz: () => void;
    resumeQuiz: () => void;
    skipQuestion: () => void;
    reduceOptions: () => void;
}

// TODO: Functionality for state management
const useQuizStore = create(
    persist<QuizState & QuizActions>(
        (set, get) => ({
            // Initial state
            life: 3,
            isPlaying: false,
            quizzesPlayed: 0,
            timeRemaining: 0,
            correctAnswers: 0,
            totalQuestions: 0,
            currentQuestionIndex: 0,
            highScore: 0,
            questions: [],
            currentQuestion: null,
            isPaused: false,
            skipsRemaining: 1,
            reducedOptionsUsed: false,

            // TODO: Actions for the store
            startQuiz: (questions) => set({}),
            endQuiz: () => set({}),
            decreaseLife: () => set({}),
            resetLife: () => set({}),
            answerQuestion: (answer) => set({}),
            nextQuestion: () => set({}),
            updateTimeRemaining: (time) => set({}),
            updateHighScore: (score) => set({}),
            pauseQuiz: () => set({}),
            resumeQuiz: () => set({}),
            skipQuestion: () => set({}),
            reduceOptions: () => set({}),
        }),
        {
            name: 'quiz-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useQuizStore;