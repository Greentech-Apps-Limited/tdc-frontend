import { HomeIconFill } from '@/icons';
import { Button } from '../ui/button';
import Link from 'next/link';
import { LastReadEntry } from '@/stores/last-read-store';
import { useSearchParams } from 'next/navigation';

type ReadingGoalProps = {
  timeSpentSeconds: number;
  latestLastRead?: LastReadEntry;
};

const ReadingGoal = ({ timeSpentSeconds, latestLastRead }: ReadingGoalProps) => {
  const goalTimeMinutes = 30;
  const timeSpentMinutes = Math.round(timeSpentSeconds / 60);
  const searchParams = useSearchParams();

  const getReadingLink = () => {
    if (!latestLastRead) return '/';

    const baseLink = `/${latestLastRead.type}/${latestLastRead.segment_id || latestLastRead.surah_id}`;
    const newParams = new URLSearchParams(searchParams);
    newParams.set('verse', `${latestLastRead.surah_id}-${latestLastRead.ayah_id}`);
    const paramString = newParams.toString();
    return paramString ? `${baseLink}?${paramString}` : baseLink;
  };

  return (
    <div className="flex h-full flex-grow flex-col justify-between gap-4 rounded-xl bg-neutral-50 p-3">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold">{timeSpentMinutes}m</h2>
          <p className="text-xs text-neutral-700">out of {goalTimeMinutes}m reading goal</p>
        </div>
        <HomeIconFill className="h-6 w-6 text-neutral-300" />
      </div>
      <div>
        <Link href={getReadingLink()}>
          <Button className="mt-2 w-max rounded-full px-3 py-2 text-sm" variant="outline">
            Continue
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ReadingGoal;
