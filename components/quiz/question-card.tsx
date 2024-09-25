import useQuizStore from '@/stores/quiz-store';

type QuestionCardProps = {
  children: React.ReactNode;
};

const QuestionCard = ({ children }: QuestionCardProps) => {
  const { currentQuestionIndex, currentQuestion } = useQuizStore();

  return (
    <div className="relative">
      <div className="rounded-3xl border border-neutral-300 bg-neutral p-6 shadow">
        <h2 className="mb-4 text-lg font-semibold">
          {currentQuestionIndex + 1}. {currentQuestion?.text}
        </h2>
        {children}
      </div>
      <div className="absolute -bottom-4 left-8 right-8 -z-10 rounded-3xl border border-neutral-300 bg-neutral p-4 shadow" />
    </div>
  );
};

export default QuestionCard;
