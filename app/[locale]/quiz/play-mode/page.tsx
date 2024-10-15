import QuizGameWrapper from '@/components/quiz/quiz-game-wrapper';
import { unstable_setRequestLocale } from 'next-intl/server';

const QuizPlayModePage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <section>
      <QuizGameWrapper />
    </section>
  );
};

export default QuizPlayModePage;
