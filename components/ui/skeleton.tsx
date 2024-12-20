import { cn } from '@/lib/utils/common-utils';

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800', className)}
      {...props}
    />
  );
}

export { Skeleton };
