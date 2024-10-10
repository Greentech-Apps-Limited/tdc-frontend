'use client';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { convertToTitleCase } from '@/lib/utils/common-utils';
import { Table } from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu data-test="view-options-dropdown">
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-offset-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
      >
        <Button
          variant="outline"
          size="sm"
          className="ml-auto flex h-8 gap-2 rounded-full"
          data-test="view-options-trigger"
        >
          <span>View</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]" data-test="view-options-content">
        <DropdownMenuLabel data-test="view-options-label">Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(column => typeof column.accessorFn !== 'undefined' && column.getCanHide())
          .map(column => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.getIsVisible()}
                onCheckedChange={value => column.toggleVisibility(!!value)}
                data-test={`view-options-checkbox-${column.id}`}
              >
                {convertToTitleCase(column.id)}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
