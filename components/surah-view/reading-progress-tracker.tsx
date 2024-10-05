'use client';

import { Verse } from '@/lib/types/verses-type';
import useReadingTime from '@/hooks/use-reading-time';

type ReadingProgressTrackerProps = {
  verses: Verse[];
  children: React.ReactNode;
};

const ReadingProgressTracker: React.FC<ReadingProgressTrackerProps> = ({ children }) => {
  useReadingTime();

  return <div>{children}</div>;
};

export default ReadingProgressTracker;
