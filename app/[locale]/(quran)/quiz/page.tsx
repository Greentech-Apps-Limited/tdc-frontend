import QuizDashboard from '@/components/quiz/quiz-dashboard';
import { unstable_setRequestLocale } from 'next-intl/server';

const QuizPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <section>
      <QuizDashboard />
    </section>
  );
};

export default QuizPage;
