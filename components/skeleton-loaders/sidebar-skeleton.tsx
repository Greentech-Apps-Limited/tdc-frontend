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

export default SidebarSkeleton;
