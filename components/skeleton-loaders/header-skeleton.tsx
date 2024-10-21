import { Skeleton } from '../ui/skeleton';

const HeaderSkeleton = () => {
  return (
    <header className="flex h-16 items-center justify-end border-b border-neutral-200 bg-neutral px-6 py-4 shadow">
      <section className="flex items-center gap-4">
        <Skeleton className="h-[40px] w-[118px]" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </section>
    </header>
  );
};

export default HeaderSkeleton;
