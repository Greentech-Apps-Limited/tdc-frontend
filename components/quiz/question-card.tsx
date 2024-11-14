import useQuizStore from '@/stores/quiz-store';

type QuestionCardProps = {
  children: React.ReactNode;
};

const QuestionCard = ({ children }: QuestionCardProps) => {
  const { currentQuestionIndex, currentQuestion } = useQuizStore();

  return (
    <div className="relative mx-4">
      <div className="rounded-2xl border border-neutral-300 bg-neutral p-4 shadow md:rounded-3xl md:p-6">
        <h2 className="mb-4 text-lg font-semibold">
          {currentQuestionIndex + 1}. {currentQuestion?.text}
        </h2>
        {children}
      </div>
      <div className="absolute -bottom-4 left-8 right-8 -z-10 rounded-2xl border border-neutral-300 bg-neutral p-4 shadow md:rounded-3xl" />
    </div>
  );
};

export default QuestionCard;
