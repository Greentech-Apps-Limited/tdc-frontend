'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  OnChangeFn,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTableToolbar } from './data-table-toolbar';
import { DataTablePagination } from './data-table-pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageCount?: number;
  state?: {
    pagination: PaginationState;
  };
  onPaginationChange?: OnChangeFn<PaginationState>;
  manualPagination?: boolean;
  getTotalRowCount?: () => number;
  isLoading?: boolean;
  translations: {
    noResults: string;
  };
}

const TableRowSkeleton = ({ cellCount }: { cellCount: number }) => (
  <TableRow className="animate-pulse">
    {Array.from({ length: cellCount }).map((_, index) => (
      <TableCell key={index}>
        <div className="h-6 w-full rounded-full bg-neutral-200" />
      </TableCell>
    ))}
  </TableRow>
);

export function DataTable<TData extends { isCurrentUser?: boolean }, TValue>({
  columns,
  data,
  pageCount,
  state,
  onPaginationChange,
  manualPagination = false,
  getTotalRowCount,
  isLoading,
  translations,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const handlePaginationChange: OnChangeFn<PaginationState> = React.useCallback(
    updaterOrValue => {
      const newValue =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(state?.pagination || pagination)
          : updaterOrValue;

      if (onPaginationChange) {
        onPaginationChange(newValue);
      } else {
        setPagination(newValue);
      }
    },
    [onPaginationChange, pagination, state?.pagination]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination: state?.pagination || pagination,
    },
    pageCount: pageCount,
    onPaginationChange: handlePaginationChange,
    manualPagination,
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const currentPageSize = state?.pagination.pageSize || pagination.pageSize;

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className=" rounded-2xl border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              // Render skeleton rows based on current page size
              Array.from({ length: currentPageSize }).map((_, index) => (
                <TableRowSkeleton key={`skeleton-${index}`} cellCount={columns.length} />
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={`${row.original.isCurrentUser ? 'bg-neutral-50 hover:bg-neutral-100' : ''}`}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  {translations.noResults}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} totalRows={getTotalRowCount?.() || 0} />
    </div>
  );
}
