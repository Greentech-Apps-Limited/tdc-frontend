import { Skeleton } from '@/components/ui/skeleton';

const WordSkeleton = () => {
  return (
    <div className="inline-block text-center align-middle">
      <div className="space-y-2 px-1">
        <Skeleton className="mx-auto h-12 w-16" />
        <Skeleton className="mx-auto block h-6 w-20" />
      </div>
    </div>
  );
};

const VerseDisplayCardSkeleton = () => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral p-6">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-6 w-8" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>

      <div className="mb-4 text-right" dir="rtl">
        <div className="inline leading-[60px]">
          {[...Array(10)].map((_, index) => (
            <WordSkeleton key={index} />
          ))}
        </div>
      </div>

      <div className="mt-2 space-y-4">
        {[...Array(1)].map((_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="mb-2 h-4 w-1/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerseDisplayCardSkeleton;
