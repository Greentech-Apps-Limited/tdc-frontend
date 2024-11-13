import { Link } from '@/i18n/routing';
import React from 'react';
import { Button } from '../ui/button';
import { ChoiceIconFill } from '@/icons';
import { useNumberTranslation } from '@/hooks/use-number-translation';
import { useTranslations } from 'next-intl';

type QuizGoalProps = {
  totalParticipatedQuizzes: number;
  authStatus?: 'loading' | 'authenticated' | 'unauthenticated';
};
const QuizGoal = ({ totalParticipatedQuizzes }: QuizGoalProps) => {
  const t = useTranslations('WeeklyProgress');
  const translateNumber = useNumberTranslation();
  const goal = 10;

  return (
    <div className="flex h-full flex-grow flex-col justify-between gap-4 rounded-xl bg-neutral-50 p-3">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">{translateNumber(totalParticipatedQuizzes)}</h2>
          <p className="text-xs text-neutral-700">
            {t('quizGoal', { goal: translateNumber(goal) })}
          </p>
        </div>
        <ChoiceIconFill className="h-6 w-6 text-neutral-300" />
      </div>
      <div>
        <Link href="/quiz">
          <Button className="mt-2 w-max rounded-full px-3 py-2 text-sm" variant="outline">
            Give test
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizGoal;
