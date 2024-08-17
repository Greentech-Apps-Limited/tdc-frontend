import QuranDetailsSidebar from '@/components/quran-view/quran-details-sidebar';
import { readData } from '@/lib/read-file';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import React from 'react';

type SegmentListProps = {
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
};

const SegmentList = async ({ params }: SegmentListProps) => {
  const quranMeta: QuranMeta = await readData<QuranMeta>('data/quran-meta.json');

  return <QuranDetailsSidebar quranMeta={quranMeta} listType={params.quranSegment} />;
};

export default SegmentList;
