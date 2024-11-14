const ButtonSkeleton = ({ className = '' }) => (
  <div className={`h-10 w-full animate-pulse rounded-full bg-neutral-200 ${className}`} />
);

const QuizIntroCardSkeleton = () => {
  return (
    <section className="flex h-full flex-col justify-between rounded-2xl border border-neutral-300 bg-neutral p-4 shadow md:rounded-4xl md:p-6">
      <div className="space-y-4">
        {/* Title skeleton */}
        <div className="h-9 w-3/4 animate-pulse rounded-lg bg-neutral-200" />

        {/* Description skeleton - multiple lines */}
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-neutral-200" />
          <div className="h-4 w-4/6 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>

      {/* Buttons container with same layout as original */}
      <div className="mt-auto flex flex-col gap-4 pt-4 sm:flex-row md:max-w-96">
        <ButtonSkeleton className="bg-neutral-300" />
        <ButtonSkeleton />
      </div>
    </section>
  );
};

export default QuizIntroCardSkeleton;
