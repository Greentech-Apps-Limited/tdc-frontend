'use client';

import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { ChoiceIcon, PdfNoteIcon, TextRightIcon, TimeClockIcon } from '@/icons';
import { useTranslations } from 'next-intl';
import { formatRank } from '@/lib/utils/common-utils';
import { PlayerData } from '@/lib/types/leaderboard';
import { authorizedFetcher } from '@/services/api';

type StatCardProps = {
  title: string;
  value: string | number;
  description: string;
  icon: React.JSX.Element;
  isLoading?: boolean;
};

function StatCard({ title, value, description, icon, isLoading = false }: StatCardProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="mb-2 flex items-start justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
          <div className="text-neutral-300">{icon}</div>
        </div>
        <div className="mb-1 h-8 w-16 animate-pulse rounded bg-neutral-200" />
        <div className="h-4 w-32 animate-pulse rounded bg-neutral-200" />
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-2 flex items-start justify-between">
        <h3 className="text-xs font-semibold">{title}</h3>
        <div className="text-neutral-500">{icon}</div>
      </div>
      <p className="mb-1 text-3xl font-bold">{value}</p>
      <p className="text-xs text-neutral-600">{description}</p>
    </div>
  );
}

export default function StatisticsPanel() {
  const t = useTranslations('Statistics');
  const { data: session, status } = useSession();

  const { data: playerData, isLoading } = useSWR<PlayerData>(
    status === 'authenticated' ? ['/quiz/players/me/', session?.accessToken] : null,
    ([url, token]) => authorizedFetcher<PlayerData>(url, token as string),
    { revalidateOnMount: true }
  );

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
        value={playerData ? `${playerData.points}` : '-'}
        description={t('quizScore.description')}
        icon={<ChoiceIcon className="h-6 w-6" />}
        isLoading={isLoading || status === 'loading'}
      />
      <StatCard
        title={t('leaderboard.title')}
        value={playerData ? formatRank(playerData.rank) : '-'}
        description={t('leaderboard.description')}
        icon={<PdfNoteIcon className="h-6 w-6" />}
        isLoading={isLoading || status === 'loading'}
      />
    </div>
  );
}
