import { Skeleton } from '../ui/skeleton';

const SidebarSkeleton = () => {
  return (
    <aside className="flex h-full w-[276px] flex-col border-r border-neutral-200 bg-neutral shadow">
      <div className="p-6">
        <Skeleton className="h-[40px] w-[150px]" />
      </div>
      <nav className="h-full w-full p-4">
        <ul className="flex w-full flex-col gap-2">
          {[...Array(3)].map((_, index) => (
            <li key={index}>
              <Skeleton className="h-[52px] w-full rounded-full" />
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

const QuranDetailsSidebarSkeleton = () => {
  return (
    <section className="h-full w-[206px] overflow-y-scroll border-r border-neutral-200 bg-neutral p-4">
      <div className="space-y-2">
        {[...Array(20)].map((_, index) => (
          <div
            key={index}
            className="w-full overflow-hidden rounded-full border border-neutral-100"
          >
            <div className="flex items-center gap-2 p-3">
              <Skeleton className="h-6 w-8" />
              <Skeleton className="h-6 flex-1" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { QuranDetailsSidebarSkeleton, SidebarSkeleton };
