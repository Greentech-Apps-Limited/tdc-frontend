'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { DataTableColumnHeader } from './data-table-column-header';
import { formatRank } from '@/lib/utils/common-utils';
import { LeaderboardEntry } from '@/lib/types/leaderboard';
import { useNumberTranslation } from '@/hooks/use-number-translation';

export function useLeaderboardColumns(): ColumnDef<LeaderboardEntry>[] {
  const t = useTranslations('Leaderboard.columns');
  const translateNumber = useNumberTranslation();

  return [
    {
      accessorKey: 'rank',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('rank')} />,
      cell: ({ row }) => (
        <div className="w-max text-sm font-semibold">
          {translateNumber(formatRank(row.getValue('rank')))}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('name')} />,
      cell: ({ row }) => (
        <div className={`w-full text-sm font-semibold md:min-w-96`}>{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'points',
      header: ({ column }) => <DataTableColumnHeader column={column} title={t('points')} />,
      cell: ({ row }) => {
        return (
          <div className="flex w-max font-semibold">
            <span>
              {translateNumber(row.getValue('points'))} {t('pointsSuffix')}
            </span>
          </div>
        );
      },
    },
  ];
}
