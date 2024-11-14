const TafsirSkeleton = () => {
  return (
    <div className="space-y-6 p-1">
      <div className="flex justify-end space-y-2">
        <div className="h-8 w-3/4 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
      </div>

      {[1, 2].map(index => (
        <div key={index} className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />

          <div className="space-y-3">
            <div className="h-4 w-full animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-5/6 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-4 w-4/6 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          </div>
        </div>
      ))}

      <div className="space-y-4">
        <div className="h-4 w-32 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        <div className="space-y-3">
          <div className="h-4 w-11/12 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-3/4 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-5/6 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
          <div className="h-4 w-2/3 animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800" />
        </div>
      </div>
    </div>
  );
};

export default TafsirSkeleton;
