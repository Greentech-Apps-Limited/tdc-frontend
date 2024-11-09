import { Skeleton } from '@/components/ui/skeleton';

const WordSkeleton = () => {
  return (
    <div className="inline-block text-center align-middle">
      <div className="space-y-2 px-1">
        <Skeleton className="mx-auto h-8 w-10 md:h-12 md:w-16" />
        <Skeleton className="mx-auto block h-5  w-16 md:h-5 md:w-20" />
      </div>
    </div>
  );
};

const VerseDisplayCardSkeleton = () => {
  return (
    <div className="mt-4 rounded-2xl border border-neutral-200 bg-neutral p-4 md:mt-6 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <Skeleton className="h-6 w-6 md:h-6 md:w-8" />
        <div className="flex items-center space-x-4">
          <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
          <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
          <Skeleton className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      </div>

      <div className="mb-4 text-right" dir="rtl">
        <div className="inline leading-[70px] md:leading-[80px]">
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
