'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeftIcon, ArrowRightIcon } from '@/icons';
import { Table } from '@tanstack/react-table';
import { useNumberTranslation } from '@/hooks/use-number-translation';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  totalRows: number;
}

export function DataTablePagination<TData>({ table, totalRows }: DataTablePaginationProps<TData>) {
  const t = useTranslations('Pagination');
  const translateNumber = useNumberTranslation();

  const { pageSize, pageIndex } = table.getState().pagination;

  const start = pageIndex * pageSize + 1;
  const end = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div
      className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0"
      data-test="table-pagination"
    >
      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Select
            value={`${pageSize}`}
            onValueChange={value => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="md:w-[140px]" data-test="page-size-select">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top" data-test="page-size-list">
              {[10, 20, 30, 40, 50].map(size => (
                <SelectItem key={size} value={`${size}`}>
                  {t('itemsPerPage', { count: translateNumber(size) })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-muted-foreground hidden text-sm md:block">
          {t('showing', {
            start: translateNumber(start),
            end: translateNumber(end),
            total: translateNumber(totalRows),
          })}
        </div>
      </div>

      <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-x-6 sm:space-y-0">
        <div
          className="flex w-full items-center justify-center rounded-full border border-neutral-300 px-3 py-1 text-sm font-medium sm:w-auto"
          data-test="page-info"
        >
          {t('pageInfo', {
            current: translateNumber(pageIndex + 1),
            total: translateNumber(Math.ceil(totalRows / pageSize)),
          })}
        </div>

        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-10 rounded-full px-3 py-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            data-test="previous-page-button"
          >
            <span className="sr-only">{t('previousPage')}</span>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-10 rounded-full px-3 py-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            data-test="next-page-button"
          >
            <span className="sr-only">{t('nextPage')}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
