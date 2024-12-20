import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';

const StartQuizButton = ({ onClick }: { onClick: () => void }) => {
  const t = useTranslations('QuizIntroCard');
  return (
    <Button
      className="w-full rounded-full bg-brown-600 text-white hover:bg-brown-500"
      onClick={onClick}
    >
      {t('playNow')}
    </Button>
  );
};

const ViewLeaderBoardButton = () => {
  const t = useTranslations('QuizIntroCard');
  return (
    <Link href="/quiz/leaderboard">
      <Button className="w-full rounded-full" variant="outline">
        {t('viewLeaderBoard')}
      </Button>
    </Link>
  );
};

const QuizIntroCard = ({
  setShowLevelModal,
  unauthenticated,
}: {
  setShowLevelModal: (value: boolean) => void;
  unauthenticated: boolean;
}) => {
  const t = useTranslations('QuizIntroCard');
  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-neutral-300 bg-neutral p-4 shadow md:rounded-4xl md:p-6">
      <div className="space-y-4">
        <h1 className="font-hidayatullah_demo text-3xl font-bold">{t('title')}</h1>
        <p className="text-base">{t('description')}</p>
      </div>
      <div className="mt-auto flex flex-col gap-4 pt-4 sm:flex-row md:max-w-96">
        {unauthenticated ? (
          <Link href="/signin">
            <Button className="w-full rounded-full bg-brown-600 text-white hover:bg-brown-500">
              {t('signInToStartQuiz')}
            </Button>
          </Link>
        ) : (
          <StartQuizButton onClick={() => setShowLevelModal(true)} />
        )}

        <ViewLeaderBoardButton />
      </div>
    </section>
  );
};

export default QuizIntroCard;
