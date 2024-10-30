import { ChoiceIcon, PdfNoteIcon, TextRightIcon, TimeClockIcon } from '@/icons';
import { useTranslations } from 'next-intl';

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.JSX.Element;
};

function StatCard({ title, value, description, icon }: StatCardProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-xs font-semibold ">{title}</h3>
        <div className="text-neutral-500">{icon}</div>
      </div>
      <p className="mb-1 text-3xl font-bold">{value}</p>
      <p className="text-xs text-neutral-600">{description}</p>
    </div>
  );
}

export default function StatisticsPanel() {
  const t = useTranslations('Statistics');

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title={t('totalAyahRead.title')}
        value={4421}
        description={t('totalAyahRead.description')}
        icon={<TextRightIcon className="h-6 w-6" />}
      />
      <StatCard
        title={t('timeSpent.title')}
        value="2h 34m"
        description={t('timeSpent.description')}
        icon={<TimeClockIcon className="h-6 w-6" />}
      />
      <StatCard
        title={t('quizScore.title')}
        value={83.4}
        description={t('quizScore.description')}
        icon={<ChoiceIcon className="h-6 w-6" />}
      />
      <StatCard
        title={t('leaderboard.title')}
        value={`53rd`}
        description={t('leaderboard.description')}
        icon={<PdfNoteIcon className="h-6 w-6" />}
      />
    </div>
  );
}
