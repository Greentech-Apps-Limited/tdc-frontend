'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { useTranslations } from 'next-intl';
import { DataTable } from './data-table';
import { useLeaderboardColumns } from './leaderboard-table-columns';
import { PaginationState } from '@tanstack/react-table';
import { authorizedFetcher, fetcher } from '@/services/api';
import { LeaderboardEntry, PlayerResponse, UserRankData } from '@/lib/types/leaderboard';

const ITEMS_PER_PAGE = 10;

const createPaginatedFetcher = (baseUrl: string) => {
  return async (pageSize: number, pageIndex: number): Promise<PlayerResponse> => {
    const offset = pageIndex * pageSize;
    const url = `${baseUrl}?limit=${pageSize}&offset=${offset}`;
    const response = await fetcher<PlayerResponse>(url);
    return response;
  };
};

export default function EnhancedLeaderboard() {
  const t = useTranslations('Leaderboard');
  const leaderboardTableColumns = useLeaderboardColumns();
  const { data: session, status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: ITEMS_PER_PAGE,
  });

  const { data: userRankData } = useSWR<UserRankData>(
    isAuthenticated && session?.accessToken ? '/quiz/players/me' : null,
    (url: string) => authorizedFetcher<UserRankData>(url, session?.accessToken as string)
  );

  useEffect(() => {
    if (userRankData?.rank) {
      const userPageIndex = Math.floor((userRankData.rank - 1) / pageSize);
      setPagination(prev => ({
        ...prev,
        pageIndex: userPageIndex,
      }));
    }
  }, [userRankData?.rank, pageSize]);

  const paginationKey = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const { data: leaderboardData, isLoading } = useSWR(
    ['/quiz/players/', paginationKey],
    () => createPaginatedFetcher('/quiz/players/')(pageSize, pageIndex),
    {
      keepPreviousData: true,
    }
  );

  const transformedData: LeaderboardEntry[] = useMemo(() => {
    if (!leaderboardData?.results) return [];

    return leaderboardData.results.map(player => ({
      rank: player.rank,
      name: player.account.name || player.account.email.split('@')[0] || t('anonymous'),
      points: player.points,
      isCurrentUser: isAuthenticated && userRankData?.account.url === player.account.url,
    }));
  }, [leaderboardData?.results, isAuthenticated, userRankData, t]);

  const pageCount = useMemo(() => {
    return leaderboardData ? Math.ceil(leaderboardData.count / pageSize) : 0;
  }, [leaderboardData, pageSize]);

  return (
    <section className="h-full w-full space-y-2 rounded-3xl border border-neutral-300 bg-neutral p-4 md:rounded-4xl md:p-6">
      <p className="text-sm md:text-base">{t('quiz')}</p>
      <h1 className="font-hidayatullah_demo text-xl font-bold md:text-3xl">{t('title')}</h1>
      <div className="mt-6">
        <DataTable
          data={transformedData}
          columns={leaderboardTableColumns}
          pageCount={pageCount}
          state={{
            pagination: {
              pageIndex,
              pageSize,
            },
          }}
          onPaginationChange={setPagination}
          manualPagination={true}
          getTotalRowCount={() => leaderboardData?.count || 0}
          isLoading={status === 'loading' || isLoading}
          translations={{
            noResults: t('noResults'),
          }}
        />
      </div>
    </section>
  );
}
