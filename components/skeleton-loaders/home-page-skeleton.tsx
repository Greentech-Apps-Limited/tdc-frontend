import { Skeleton } from '../ui/skeleton';

const BannerSkeleton = () => {
  return (
    <section>
      <Skeleton className="h-[136px] w-[248px]" />
    </section>
  );
};

const SurahRowSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[...Array(9)].map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-full border border-neutral-200 bg-neutral p-2 pr-6"
        >
          <div className="flex gap-3">
            <Skeleton className="h-[52px] w-[52px] rounded-full" />
            <div>
              <Skeleton className="mb-2 h-6 w-32" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Skeleton className="h-[30px] w-[80px]" />
        </div>
      ))}
    </div>
  );
};

const QuickAccessSectionSkeleton = () => <div className="w-ful h-72 bg-transparent" />;

export { BannerSkeleton, SurahRowSkeleton, QuickAccessSectionSkeleton };
