import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
const StartQuizButton = () => {
  const router = useRouter();

  const handleStartQuiz = () => {
    router.push('/quiz/play-mode');
  };

  return (
    <Button
      className="w-full rounded-full bg-brown-600 text-white hover:bg-brown-500"
      onClick={handleStartQuiz}
    >
      Play Now
    </Button>
  );
};

const ViewLeaderBoardButton = () => (
  <Button className="w-full rounded-full" variant="outline">
    View Leader Board
  </Button>
);

const QuizIntroCard = () => {
  return (
    <section className="flex h-full flex-col justify-between rounded-4xl border border-neutral-300 bg-neutral p-6 shadow">
      <div className="space-y-4">
        <h1 className="font-hidayatullah_demo text-3xl font-bold">Quranic Quiz</h1>
        <p className="text-base">
          Embark on a journey of Quranic discovery! Test your knowledge with our quiz and deepen
          your understanding of the divine verbs found in the Quran.
        </p>
      </div>
      <div className="mt-auto flex max-w-96 gap-4 pt-4">
        <StartQuizButton />
        <ViewLeaderBoardButton />
      </div>
    </section>
  );
};

export default QuizIntroCard;
