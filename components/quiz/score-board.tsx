import { useNumberTranslation } from '@/hooks/use-number-translation';
import { useTranslations } from 'next-intl';

type ScoreboardProps = {
  quizzesAttempted: number;
  score: number;
  leaderBoardPosition: number;
};

export const Scoreboard = ({ quizzesAttempted, score, leaderBoardPosition }: ScoreboardProps) => {
  const t = useTranslations('Scoreboard');
  const translateNumber = useNumberTranslation();

  return (
    <section className="h-full space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-4 shadow">
      <div>
        <h1 className="text-xl font-semibold">{t('title')}</h1>
      </div>
      <section>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-neutral-50 p-4">
            <p className="text-xl font-bold">
              {translateNumber(quizzesAttempted.toString().padStart(2, '0'))}
            </p>
            <p className="text-sm text-neutral-700">{t('quizzesAttempted')}</p>
          </div>
          <div className="rounded-2xl bg-neutral-50 p-4">
            <p className="text-xl font-bold">{translateNumber(score)}</p>
            <p className="text-sm text-neutral-700">{t('scoreOnQuizzes')}</p>
          </div>
          <div className="col-span-2 rounded-2xl bg-neutral-50 p-4">
            <p className="font-hidayatullah_demo text-3xl font-bold">
              {translateNumber(leaderBoardPosition)}
              {t('leaderboardSuffix')}
            </p>
            <p className="text-sm text-neutral-700">{t('onLeaderboard')}</p>
          </div>
        </div>
      </section>
    </section>
  );
};
