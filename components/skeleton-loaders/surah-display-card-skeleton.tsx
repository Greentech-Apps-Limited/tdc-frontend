import { Skeleton } from '../ui/skeleton';

const SurahDisplayCardSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-6 mt-0 space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-6 shadow">
      <Skeleton className="h-9 w-40 rounded-lg" />
      {children}
    </div>
  );
};

export default SurahDisplayCardSkeleton;
