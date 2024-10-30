import QuranDetailsSkeleton from '@/components/skeleton-loaders/quran-details-skeleton';
import { HIZBS } from '@/data/quran-meta/hizbs';
import { JUZS } from '@/data/quran-meta/juzs';
import { PAGES } from '@/data/quran-meta/pages';
import { RUKUS } from '@/data/quran-meta/rukus';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { Suspense } from 'react';

type Reference = { id: number | string };

const QuranSegmentDetailsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="py-6">
      <Suspense fallback={<QuranDetailsSkeleton />}>{children}</Suspense>
    </section>
  );
};

export default QuranSegmentDetailsLayout;

export async function generateStaticParams() {
  const segmentMap: Record<Exclude<QuranSegment, 'surah'>, Reference[]> & { surah: Surah[] } = {
    surah: SURAH_EN,
    page: PAGES,
    juz: JUZS,
    hizb: HIZBS,
    ruku: RUKUS,
  };

  const staticParams = Object.entries(segmentMap).flatMap(([quranSegment, references]) => {
    return references.map(reference => ({
      quranSegment,
      segmentId: reference.id.toString(),
    }));
  });

  return staticParams;
}
