'use client';

import { useEffect, useState } from 'react';
import useQuizStore, { resetAllStores } from '@/stores/quiz-store';
import QuizGame from './quiz-game';
import { Question } from '@/lib/types/quiz-types';
import { useRouter } from '@/i18n/routing';
import QuizGameSkeleton from '../skeleton-loaders/quiz-gam-skeleton';
import { useSession } from 'next-auth/react';
import { authorizedFetcher, submitQuiz } from '@/services/api';
import useSWRMutation from 'swr/mutation';
import useQuizProgressStore from '@/stores/quiz-progress-store';
import { useParams } from 'next/navigation';

type QuizApiResponse = {
  count: number;
  results: Question[];
};

const getDifficultyLevelQuery = (level: number) => {
  switch (level) {
    case 1:
      return 'difficulty_level__lte=2';
    case 2:
      return 'difficulty_level=3';
    case 3:
      return 'difficulty_level__gte=4';
    default:
      return 'difficulty_level=3';
  }
};

const QuizGameWrapper = () => {
  const { updateQuizProgress } = useQuizProgressStore();
  const { data: session } = useSession();
  const { locale } = useParams<{ locale: string }>();
  const {
    startQuiz,
    isPlaying,
    showResults,
    selectedLevel,
    isGameOver,
    correctAnswers,
    totalTimeSpent,
    questions,
    isLoading,
    setIsLoading,
  } = useQuizStore();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const { trigger: submitQuizTrigger, isMutating } = useSWRMutation(
    '/quiz/game-results/submit/',
    url =>
      submitQuiz(
        url,
        {
          arg: {
            correct_answers_count: correctAnswers,
            time_in_seconds: totalTimeSpent,
            total_questions: questions.length,
            time_per_question: 30,
          },
        },
        session?.accessToken as string
      )
  );

  useEffect(() => {
    const handleGameOver = async () => {
      if (isGameOver && !isMutating && session?.accessToken) {
        await submitQuizTrigger();
        updateQuizProgress();
      }
    };

    handleGameOver();
  }, [isGameOver]);

  useEffect(() => {
    const init = async () => {
      if (selectedLevel === null) {
        resetAllStores();
        router.replace('/quiz');
        return;
      }

      if (!isPlaying && !showResults) {
        setIsLoading(true);
        try {
          const res = await authorizedFetcher<QuizApiResponse>(
            `/quiz/questions/random/?${getDifficultyLevelQuery(selectedLevel)}&language=${locale}`,
            session?.accessToken as string
          );
          const { results: questions } = res;

          startQuiz(questions);
        } catch (err) {
          console.error('Failed to fetch questions:', err);
          setError('Failed to load quiz questions. Please try again.');
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  if (isLoading) return <QuizGameSkeleton />;
  if (error) return <div>{error}</div>;
  return <QuizGame />;
};

export default QuizGameWrapper;
