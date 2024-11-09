import { Skeleton } from '../ui/skeleton';

const SurahDisplayCardSkeleton = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-4 mt-0 space-y-4 rounded-3xl border border-neutral-300 bg-neutral p-4 shadow md:m-6 md:space-y-6 md:rounded-4xl md:p-6">
      <Skeleton className="h-6 w-32 rounded-lg md:h-9 md:w-40" />
      {children}
    </div>
  );
};

export default SurahDisplayCardSkeleton;
