'use client';

import { Table } from '@tanstack/react-table';
import { DataTableViewOptions } from './data-table-view-options';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between" data-test="table-toolbar">
      <DataTableViewOptions table={table} data-test="view-options" />
    </div>
  );
}
