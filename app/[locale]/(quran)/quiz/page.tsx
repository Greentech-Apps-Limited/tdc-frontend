import QuizDashboard from '@/components/quiz/quiz-dashboard';
import { unstable_setRequestLocale } from 'next-intl/server';
import { getStaticMetadata } from '@/lib/metadata';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return getStaticMetadata('quiz', locale);
}

const QuizPage = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <section>
      <QuizDashboard />
    </section>
  );
};

export default QuizPage;
