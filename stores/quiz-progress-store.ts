import { isBeforeLastSunday } from '@/lib/utils/common-utils';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type QuizEntry = {
    date: string;
    quizParticipations: number;
};

type QuizState = {
    weeklyQuizzes: QuizEntry[];
    updateQuizProgress: () => void;
    cleanOldQuizData: () => void;
};

const useQuizProgressStore = create(
    persist<QuizState>(
        (set) => ({
            weeklyQuizzes: [],

            updateQuizProgress: () =>
                set((state) => {
                    const today = new Date().toISOString().split('T')[0] || '';
                    const existingQuizIndex = state.weeklyQuizzes.findIndex(
                        (quiz) => quiz.date === today
                    );

                    if (existingQuizIndex !== -1) {
                        // Update existing quiz entry
                        const updatedQuizzes = state.weeklyQuizzes.map((quiz, index) =>
                            index === existingQuizIndex
                                ? { ...quiz, quizParticipations: quiz.quizParticipations + 1 }
                                : quiz
                        );
                        return { weeklyQuizzes: updatedQuizzes };
                    } else {
                        // Add new quiz entry
                        return {
                            weeklyQuizzes: [
                                ...state.weeklyQuizzes,
                                { date: today, quizParticipations: 1 }
                            ]
                        };
                    }
                }),

            cleanOldQuizData: () =>
                set((state) => ({
                    weeklyQuizzes: state.weeklyQuizzes.filter(
                        (quiz) => !isBeforeLastSunday(quiz.date)
                    )
                }))
        }),
        {
            name: 'quiz-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useQuizProgressStore;