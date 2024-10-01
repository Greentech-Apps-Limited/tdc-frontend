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

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between" data-test="table-pagination">
      <div className="flex items-center space-x-2">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={value => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger data-test="page-size-select">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top" data-test="page-size-list">
            {[10, 20, 30, 40, 50].map(pageSize => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {`${pageSize} items per page`}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div
          className="flex w-max items-center justify-center rounded-full border border-neutral-300 px-3 py-2 text-sm font-medium"
          data-test="page-info"
        >
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="h-8 w-10 rounded-full px-3 py-2"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            data-test="previous-page-button"
          >
            <span className="sr-only">Go to previous page</span>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-10 rounded-full px-3 py-2"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            data-test="next-page-button"
          >
            <span className="sr-only">Go to next page</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
