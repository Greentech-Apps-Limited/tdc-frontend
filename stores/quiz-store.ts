import { Question } from '@/lib/types/quiz-types';
import { create } from 'zustand';

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
    pauseUsed: boolean;
    skipsRemaining: number;
    selectedAnswer: string | null;
    showResults: boolean;
    score: number;
    isTimerCritical: boolean;
    currentOptions: string[];
    isReducedOptions: boolean;
    fiftyFiftyUsed: boolean;
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
    showExitConfirmation: () => boolean;
    setCurrentOptions: (options: string[]) => void;
    reduceOptions: () => void;
    resetOptionsForNewQuestion: () => void;
}

const INITIAL_STATE: QuizState = {
    life: 5,
    isPlaying: false,
    quizzesPlayed: 0,
    timeRemaining: 30,
    correctAnswers: 0,
    totalQuestions: 0,
    currentQuestionIndex: 0,
    highScore: 0,
    questions: [],
    currentQuestion: null,
    isPaused: false,
    pauseUsed: false,
    skipsRemaining: 1,
    selectedAnswer: null,
    showResults: false,
    score: 0,
    isTimerCritical: false,
    currentOptions: [],
    isReducedOptions: false,
    fiftyFiftyUsed: false,
};

const useQuizStore = create<QuizState & QuizActions>((set, get) => ({
    ...INITIAL_STATE,

    startQuiz: (questions) => set({
        isPlaying: true,
        questions,
        totalQuestions: questions.length,
        currentQuestionIndex: 0,
        currentQuestion: questions[0],
        timeRemaining: 30,
        life: 5,
        correctAnswers: 0,
        score: 0,
        skipsRemaining: 1,
        showResults: false,
        currentOptions: [],
        isReducedOptions: false,
        isPaused: false,

    }),

    setCurrentOptions: (options) => set({ currentOptions: options }),

    reduceOptions: () => set((state) => {
        if (state.fiftyFiftyUsed || state.isReducedOptions) return {};

        const correctAnswer = state.currentQuestion?.right_answer;
        if (!correctAnswer || state.currentOptions.length === 0) return {};

        const incorrectOptions = state.currentOptions.filter(option => option !== correctAnswer);
        if (incorrectOptions.length === 0) return {};

        const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

        return {
            currentOptions: [correctAnswer, randomIncorrectOption].filter((option): option is string => typeof option === 'string'),
            isReducedOptions: true,
            fiftyFiftyUsed: true,
        };
    }),

    resetOptionsForNewQuestion: () => set((state) => {
        if (!state.currentQuestion) return {};

        const allOptions = [
            state.currentQuestion.right_answer,
            state.currentQuestion.option_2,
            state.currentQuestion.option_3,
            state.currentQuestion.option_4,
        ].filter((option): option is string => typeof option === 'string');

        return {
            currentOptions: allOptions.sort(() => Math.random() - 0.5),
            isReducedOptions: false,
        };
    }),

    endQuiz: () => set((state) => {
        const newHighScore = Math.max(state.highScore, state.score);
        return {
            isPlaying: false,
            showResults: true,
            quizzesPlayed: state.quizzesPlayed + 1,
            highScore: newHighScore,
        };
    }),

    decreaseLife: () => set((state) => ({
        life: Math.max(0, state.life - 1),
    })),

    resetLife: () => set({ life: 5 }),

    answerQuestion: (answer) => set((state) => {
        const isCorrect = answer === state.currentQuestion?.right_answer;
        const newScore = isCorrect ? state.score + 10 : state.score;
        const newCorrectAnswers = isCorrect ? state.correctAnswers + 1 : state.correctAnswers;

        if (!isCorrect) {
            get().decreaseLife();
        }

        return {
            selectedAnswer: answer,
            score: newScore,
            correctAnswers: newCorrectAnswers,
        };
    }),

    nextQuestion: () => set((state) => {
        const nextIndex = state.currentQuestionIndex + 1;
        if (nextIndex >= state.totalQuestions || state.life === 0) {
            get().endQuiz();
            return {};
        }
        const nextQuestion = state.questions[nextIndex];
        get().resetOptionsForNewQuestion();
        return {
            currentQuestionIndex: nextIndex,
            currentQuestion: nextQuestion,
            timeRemaining: 30,
            selectedAnswer: null,
            isTimerCritical: false,
            isPaused: false,
        };
    }),

    updateTimeRemaining: (time) => set({
        timeRemaining: time,
        isTimerCritical: time <= 5,
    }),

    updateHighScore: (score) => set({ highScore: score }),

    pauseQuiz: () => set((state) => {
        if (state.pauseUsed) return {};
        return {
            isPaused: true,
            pauseUsed: true
        };
    }),

    resumeQuiz: () => set({ isPaused: false }),

    skipQuestion: () => set((state) => {
        if (state.skipsRemaining > 0) {
            get().nextQuestion();
            return { skipsRemaining: 0 };
        }
        return {};
    }),

    showExitConfirmation: () => {
        const state = get();
        return state.isPlaying && !state.showResults;
    },
}));

export default useQuizStore;