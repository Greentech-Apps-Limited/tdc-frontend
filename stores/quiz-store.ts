import { Question } from '@/lib/types/quiz-types';
import { create as _create } from 'zustand';
import type { StateCreator } from 'zustand';

const storeResetFns = new Set<() => void>();

export const resetAllStores = () => {
    storeResetFns.forEach((resetFn) => resetFn());
};

export const create = (<T>() => {
    return (stateCreator: StateCreator<T>) => {
        const store = _create(stateCreator);
        const initialState = store.getState();
        storeResetFns.add(() => {
            store.setState(initialState, true);
        });
        return store;
    };
}) as typeof _create;

// Types
interface QuizState {
    life: number;
    isPlaying: boolean;
    timeRemaining: number;
    correctAnswers: number;
    currentQuestionIndex: number;
    questions: Question[];
    currentQuestion: Question | null;
    isPaused: boolean;
    pauseUsed: boolean;
    skipsRemaining: number;
    selectedAnswer: string | null;
    showResults: boolean;
    isTimerCritical: boolean;
    currentOptions: string[];
    isReducedOptions: boolean;
    fiftyFiftyUsed: boolean;
    selectedLevel: number;
    selectedAnswers: string[];
    totalTimeSpent: number;
}

interface QuizActions {
    startQuiz: (questions: Question[]) => void;
    endQuiz: () => void;
    decreaseLife: () => void;
    answerQuestion: (answer: string) => void;
    nextQuestion: () => void;
    updateTimeRemaining: (time: number) => void;
    pauseQuiz: () => void;
    resumeQuiz: () => void;
    skipQuestion: () => void;
    showExitConfirmation: () => boolean;
    setCurrentOptions: (options: string[]) => void;
    reduceOptions: () => void;
    resetOptionsForNewQuestion: () => void;
    setSelectedLevel: (level: number) => void;
    updateTotalTimeSpent: () => void;
    reset: () => void;
}

const INITIAL_STATE: QuizState = {
    life: 5,
    isPlaying: false,
    timeRemaining: 30,
    correctAnswers: 0,
    currentQuestionIndex: 0,
    questions: [],
    currentQuestion: null,
    isPaused: false,
    pauseUsed: false,
    skipsRemaining: 1,
    selectedAnswer: null,
    showResults: false,
    isTimerCritical: false,
    currentOptions: [],
    isReducedOptions: false,
    fiftyFiftyUsed: false,
    selectedLevel: 1,
    selectedAnswers: [],
    totalTimeSpent: 0,
};

const useQuizStore = create<QuizState & QuizActions>()((set, get) => ({
    ...INITIAL_STATE,

    startQuiz: (questions) => set({
        ...INITIAL_STATE,
        isPlaying: true,
        questions,
        currentQuestion: questions[0],
    }),

    endQuiz: () => set({
        isPlaying: false,
        showResults: true
    }),

    decreaseLife: () => set((state) => ({
        life: Math.max(0, state.life - 1),
    })),

    answerQuestion: (answer) => set((state) => {
        const isCorrect = answer === state.currentQuestion?.right_answer;
        const newSelectedAnswers = [...state.selectedAnswers];
        newSelectedAnswers[state.currentQuestionIndex] = answer;

        if (!isCorrect) {
            get().decreaseLife();
        }

        return {
            selectedAnswer: answer,
            selectedAnswers: newSelectedAnswers,
            correctAnswers: isCorrect ? state.correctAnswers + 1 : state.correctAnswers,
        };
    }),

    nextQuestion: () => set((state) => {
        const nextIndex = state.currentQuestionIndex + 1;
        if (nextIndex >= state.questions.length || state.life === 0) {
            get().endQuiz();
            return {};
        }

        get().resetOptionsForNewQuestion();
        return {
            currentQuestionIndex: nextIndex,
            currentQuestion: state.questions[nextIndex],
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

    pauseQuiz: () => set({
        isPaused: true,
        pauseUsed: true
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

    setCurrentOptions: (options) => set({ currentOptions: options }),

    setSelectedLevel: (level) => set({ selectedLevel: level }),

    reduceOptions: () => set((state) => {
        if (state.fiftyFiftyUsed || !state.currentQuestion) return {};

        const correctAnswer = state.currentQuestion.right_answer;
        const incorrectOptions = state.currentOptions.filter(option =>
            option !== correctAnswer && option != null
        );

        if (incorrectOptions.length === 0) return {};

        const randomIncorrectOption = incorrectOptions[Math.floor(Math.random() * incorrectOptions.length)];

        if (!correctAnswer || !randomIncorrectOption) return {};

        return {
            currentOptions: [correctAnswer, randomIncorrectOption],
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
        ].filter((option): option is string => Boolean(option));

        return {
            currentOptions: allOptions.sort(() => Math.random() - 0.5),
            isReducedOptions: false,
        };
    }),

    updateTotalTimeSpent: () => set(state => ({
        totalTimeSpent: state.totalTimeSpent + 1
    })),

    reset: () => set(INITIAL_STATE),
}));

export default useQuizStore;