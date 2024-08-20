import QuranDetailsSidebar from '@/components/quran-view/quran-details-sidebar';
import { readData } from '@/lib/read-file';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';

type QuranSegmentLayoutProps = {
  children: React.ReactNode;
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
  };
};

const QuranSegmentLayout = async ({ children, params }: Readonly<QuranSegmentLayoutProps>) => {
  const quranMeta: QuranMeta = await readData<QuranMeta>('data/quran-meta.json');
  return (
    <section className="flex h-full w-full">
      <aside className="h-full overflow-hidden">
        <QuranDetailsSidebar quranMeta={quranMeta} listType={params.quranSegment} />
      </aside>
      <aside className="h-full w-full flex-1 overflow-y-scroll">{children}</aside>
    </section>
  );
};

export default QuranSegmentLayout;

export function generateStaticParams() {
  const quranSegments: QuranSegment[] = ['surah', 'page', 'juz', 'hizb', 'ruku'];

  const staticParams = quranSegments.map(quranSegment => ({
    quranSegment,
  }));

  return staticParams;
}
