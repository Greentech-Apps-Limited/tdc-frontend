'use client';
import { useEffect, useState } from 'react';
import useQuizStore from '@/stores/quiz-store';
import QuizGame from './quiz-game';
import { Question } from '@/lib/types/quiz-types';

const QuizGameWrapper = () => {
  const { startQuiz, isPlaying } = useQuizStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestionsAndStartQuiz = async () => {
      try {
        // Simulating API call with the provided data
        const data = {
          results: [
            {
              id: 6960,
              text: 'What is the meaning of the word "بَٰرَكَ" ',
              right_answer: 'Be blessed',
              categories: [1],
              option_2: 'Time, time',
              option_3: 'Will come',
              option_4: 'Feathers,',
              difficulty_level: 2,
            },
            {
              id: 6868,
              text: 'What is the meaning of the word "رَمَىٰ" ',
              right_answer: 'Throw',
              categories: [1],
              option_2: 'Hakim, judge',
              option_3: 'Sitting',
              option_4: 'High',
              difficulty_level: 2,
            },
            {
              id: 6824,
              text: 'What is the meaning of the word "زَرْع" ',
              right_answer: 'Crop, crop',
              categories: [1],
              option_2: 'Curse',
              option_3: 'Virtue, monarchy',
              option_4: 'Loyal',
              difficulty_level: 2,
            },
          ],
        };
        const questions: Question[] = data.results;
        startQuiz(questions);
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to fetch questions:', err);
        setError('Failed to load quiz questions. Please try again.');
        setIsLoading(false);
      }
    };

    if (!isPlaying) {
      fetchQuestionsAndStartQuiz();
    } else {
      setIsLoading(false);
    }
  }, [startQuiz, isPlaying]);

  if (isLoading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!isPlaying) {
    return <div>No active quiz. Please start a new quiz.</div>;
  }

  return <QuizGame />;
};

export default QuizGameWrapper;
