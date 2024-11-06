import QuranDetailsSkeleton from '@/components/skeleton-loaders/quran-details-skeleton';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { Reference, Surah } from '@/lib/types/quran-meta-types';
import { Suspense } from 'react';
import { loadQuranMetadata } from '@/lib/utils/quran-meta';

const QuranSegmentDetailsLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <section className="py-6">
      <Suspense fallback={<QuranDetailsSkeleton />}>{children}</Suspense>
    </section>
  );
};

export default QuranSegmentDetailsLayout;

export async function generateStaticParams() {
  const segments: QuranSegment[] = ['surah', 'page', 'juz', 'hizb', 'ruku'];

  const staticParams = await Promise.all(
    segments.map(async segment => {
      const references = await loadQuranMetadata(segment);
      if (!references) return [];

      // Type guard to handle both Reference and Surah types
      return (references as (Reference | Surah)[]).map((reference: Reference | Surah) => ({
        quranSegment: segment,
        segmentId: reference.id.toString(),
      }));
    })
  );

  return staticParams.flat();
}
