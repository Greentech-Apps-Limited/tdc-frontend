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

const QuizIntroCard = ({ setShowLevelModal }: { setShowLevelModal: (value: boolean) => void }) => {
  const t = useTranslations('QuizIntroCard');
  return (
    <section className="flex h-full flex-col justify-between rounded-4xl border border-neutral-300 bg-neutral p-6 shadow">
      <div className="space-y-4">
        <h1 className="font-hidayatullah_demo text-3xl font-bold">{t('title')}</h1>
        <p className="text-base">{t('description')}</p>
      </div>
      <div className="mt-auto flex max-w-96 gap-4 pt-4">
        <StartQuizButton onClick={() => setShowLevelModal(true)} />
        <ViewLeaderBoardButton />
      </div>
    </section>
  );
};

export default QuizIntroCard;
