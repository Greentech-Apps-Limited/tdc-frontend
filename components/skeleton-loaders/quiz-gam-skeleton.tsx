import { Skeleton } from '@/components/ui/skeleton';

const QuizHeaderSkeleton = () => {
  return (
    <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral px-6 py-4">
      <Skeleton className="h-9 w-24 rounded-full" />
      <Skeleton className="h-8 w-20 rounded-full" />
      <Skeleton className="h-8 w-20 rounded-full" />
    </div>
  );
};

const QuestionCardSkeleton = () => {
  return (
    <div className="relative">
      <div className="rounded-3xl border border-neutral-300 bg-neutral p-4 shadow md:p-6">
        <Skeleton className="mb-4 h-6 w-3/4" />
        <div className="space-y-2">
          {[...Array(4)].map((_, index) => (
            <Skeleton key={index} className="h-10 w-full rounded-md" />
          ))}
        </div>
      </div>
      <div className="absolute -bottom-4 left-8 right-8 -z-10 rounded-3xl border border-neutral-300 bg-neutral p-4 shadow" />
    </div>
  );
};

const NavigationControlsSkeleton = () => {
  return (
    <div className="m-auto flex w-max justify-center gap-2 rounded-full border border-neutral-200 bg-neutral p-2 shadow">
      {[...Array(3)].map((_, index) => (
        <Skeleton key={index} className="h-[56px] w-[56px] rounded-full" />
      ))}
    </div>
  );
};

const QuizGameSkeleton = () => {
  return (
    <div>
      <QuizHeaderSkeleton />
      <div className="m-6 mx-auto max-w-md space-y-8">
        <QuestionCardSkeleton />
        <NavigationControlsSkeleton />
      </div>
    </div>
  );
};

export default QuizGameSkeleton;
