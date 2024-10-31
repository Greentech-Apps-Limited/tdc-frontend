import { Skeleton } from '@/components/ui/skeleton';

const AudioControlsSkeleton = () => {
  return (
    <div className="flex items-center justify-between">
      <Skeleton className="h-4 w-12" />
      <div className="flex items-center gap-4">
        {[...Array(5)].map((_, index) => (
          <Skeleton key={index} className="h-8 w-8 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-4 w-12" />
    </div>
  );
};

const AudioProgressSkeleton = () => {
  return (
    <div className="relative h-2 w-full">
      <Skeleton className="h-2 w-full rounded-full" />
      <Skeleton className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full" />
    </div>
  );
};

const AudioPlayerSkeleton = () => {
  return (
    <div className="w-96 space-y-6 rounded-xl border border-neutral-300 bg-neutral p-4 shadow">
      <div className="flex justify-between">
        <div>
          <Skeleton className="mb-2 h-6 w-24" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-8 w-8" />
      </div>

      <AudioProgressSkeleton />

      <AudioControlsSkeleton />
    </div>
  );
};

export default AudioPlayerSkeleton;
