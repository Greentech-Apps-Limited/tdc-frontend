import { Skeleton } from '@/components/ui/skeleton';

const AudioControlsSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="min-w-10 text-xs">
        <Skeleton className="h-4 w-10" />
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Skeleton className="h-8 w-8 rounded-lg" />
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            className={`h-8 w-8 ${index === 1 ? 'rounded-full' : 'rounded-lg'}`}
          />
        ))}
      </div>
      <div className="min-w-10">
        <Skeleton className="ml-auto h-4 w-10" />
      </div>
    </div>
  );
};

const AudioProgressSkeleton = () => {
  return (
    <div className="relative h-2 w-full">
      <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 transform rounded-full">
        <Skeleton className="h-full w-full rounded-full" />
      </div>
      <Skeleton className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </div>
  );
};

const AudioPlayerSkeleton = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto p-4 md:absolute md:bottom-auto md:left-auto md:right-auto md:p-6">
      <div className="relative w-full space-y-4 rounded-xl border border-neutral-300 bg-neutral p-4 shadow md:w-96 md:space-y-6">
        <div className="flex justify-between">
          <div>
            <Skeleton className="mb-2 h-6 w-32" />
            <div className="flex w-full items-center justify-start gap-1">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-52 rounded-full" />
            </div>
          </div>
          <Skeleton className="absolute right-2 top-2 h-8 w-8" />
        </div>
        <AudioProgressSkeleton />
        <AudioControlsSkeleton />
      </div>
    </div>
  );
};

export default AudioPlayerSkeleton;
