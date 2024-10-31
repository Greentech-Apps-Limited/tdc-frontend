'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { LeaderboardEntry } from '@/lib/types/leaderboard';
import { formatRank } from '@/lib/utils/common-utils';

export const leaderboardTableColumns: ColumnDef<LeaderboardEntry>[] = [
  {
    accessorKey: 'rank',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Rank" />,
    cell: ({ row }) => (
      <div className="w-max text-sm font-semibold">{formatRank(row.getValue('rank'))}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <div className="w-full min-w-96 text-sm font-semibold">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'points',
    header: ({ column }) => <DataTableColumnHeader column={column} title="Points" />,
    cell: ({ row }) => {
      return (
        <div className="flex w-max font-semibold">
          <span>{row.getValue('points')} pts.</span>
        </div>
      );
    },
  },
];
