import { Skeleton } from '@/components/ui/skeleton';

export const ScoreboardSkeleton = () => {
  return (
    <section className="h-full space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-4 shadow">
      <div>
        <Skeleton className="h-6 w-32" />
      </div>
      <section>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-neutral-50 p-4">
            <Skeleton className="mb-2 h-6 w-12" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="rounded-2xl bg-neutral-50 p-4">
            <Skeleton className="mb-2 h-6 w-16" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="col-span-2 rounded-2xl bg-neutral-50 p-4">
            <Skeleton className="mb-2 h-7 w-24" />
            <Skeleton className="h-5 w-32" />
          </div>
        </div>
      </section>
    </section>
  );
};

export default ScoreboardSkeleton;
