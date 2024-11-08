'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import useSWR from 'swr';
import { DataTable } from './data-table';
import { leaderboardTableColumns } from './leaderboard-table-columns';
import { PaginationState } from '@tanstack/react-table';
import { fetcher } from '@/services/api';

interface PlayerData {
  account: {
    name: string;
    url: string;
  };
  points: number;
  quiz_attempted: number;
  rank: number;
  ranking_group: number;
}

interface PlayerResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PlayerData[];
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  isCurrentUser: boolean;
}

const createPaginatedFetcher = (baseUrl: string) => {
  return async (pageSize: number, pageIndex: number): Promise<PlayerResponse> => {
    const offset = pageIndex * pageSize;
    const url = `${baseUrl}?limit=${pageSize}&offset=${offset}`;
    const response = await fetcher<PlayerResponse>(url);
    return response;
  };
};

const LeaderboardMain = () => {
  const { status } = useSession();

  const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const paginationKey = React.useMemo(
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

  const transformedData: LeaderboardEntry[] = React.useMemo(
    () =>
      leaderboardData?.results.map(player => ({
        rank: player.rank,
        name: player.account.name || 'Anonymous',
        points: player.points,
        isCurrentUser: false,
      })) || [],
    [leaderboardData]
  );

  const pageCount = React.useMemo(() => {
    return leaderboardData ? Math.ceil(leaderboardData.count / pageSize) : 0;
  }, [leaderboardData, pageSize]);

  return (
    <section className="h-full w-full space-y-2 rounded-4xl border border-neutral-300 bg-neutral p-6">
      <p>Quiz</p>
      <h1 className="font-hidayatullah_demo text-3xl font-bold">Leaderboard</h1>
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
        />
      </div>
    </section>
  );
};

export default LeaderboardMain;
