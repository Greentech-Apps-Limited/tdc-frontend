'use client';
import { useEffect, useState } from 'react';
import useQuizStore from '@/stores/quiz-store';
import QuizGame from './quiz-game';
import { Question } from '@/lib/types/quiz-types';

const QuizGameWrapper = () => {
  const { startQuiz, isPlaying, showResults } = useQuizStore();
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
            {
              id: 17248,
              text: 'What is the meaning of the word "عُلْيَا" ',
              right_answer: 'High',
              categories: [1],
              option_2: 'Safe',
              option_3: 'Liar',
              option_4: 'Manually, nafs, soul',
              difficulty_level: 2,
              reference: '',
              last_modified: '2021-09-19T07:04:34.251150Z',
            },
            {
              id: 16871,
              text: 'What is the ruling on the "Musharaka" agreement in Islam?',
              right_answer: 'Halal',
              categories: [75, 37],
              option_2: 'Haram',
              option_3: 'Mustahab',
              option_4: 'Maqruh',
              difficulty_level: 5,
              reference: '',
              last_modified: '2021-10-26T11:10:11.140483Z',
            },
            {
              id: 12063,
              text: 'On what day did Adam (As) die?',
              right_answer: "On the Day of Jumu'ah",
              categories: [30],
              option_2: 'On the Day of Ashura',
              option_3: 'On Monday',
              option_4: 'On Saturday',
              difficulty_level: 3,
              reference: '',
              last_modified: '2021-09-17T08:19:01.934094Z',
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

    if (!isPlaying && !showResults) {
      fetchQuestionsAndStartQuiz();
    } else {
      setIsLoading(false);
    }
  }, [startQuiz, isPlaying, showResults]);

  //TODO: handleRestartQuiz If needed
  // const handleRestartQuiz = () => {
  //   setIsLoading(true);
  //   endQuiz();
  // };

  if (isLoading) {
    return <div>Loading quiz...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!isPlaying && !showResults) {
    return <div>No active quiz. Please start a new quiz.</div>;
  }

  return <QuizGame />;
};

export default QuizGameWrapper;
