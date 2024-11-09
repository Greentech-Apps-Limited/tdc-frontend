import QuranDetailsSidebar from '@/components/quran-view/quran-details-sidebar';
import { QuranDetailsSidebarSkeleton } from '@/components/skeleton-loaders/sidebar-skeleton';
import { HIZBS } from '@/data/quran-meta/hizbs';
import { JUZS } from '@/data/quran-meta/juzs';
import { PAGES } from '@/data/quran-meta/pages';
import { RUKUS } from '@/data/quran-meta/rukus';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

type QuranSegmentLayoutProps = {
  children: React.ReactNode;
  params: {
    quranSegment: QuranSegment;
    segmentId: string;
    locale: string;
  };
};

const QuranSegmentLayout = ({ children, params }: Readonly<QuranSegmentLayoutProps>) => {
  const surahs = SURAH_EN;
  const pages = PAGES;
  const juzs = JUZS;
  const hizbs = HIZBS;
  const rukus = RUKUS;

  const quranMeta: QuranMeta = { surahs, pages, juzs, hizbs: hizbs, rukus };
  unstable_setRequestLocale(params.locale);
  return (
    <section>
      <aside className="fixed right-auto top-16 z-10 hidden overflow-y-auto md:block">
        <Suspense fallback={<QuranDetailsSidebarSkeleton />}>
          <QuranDetailsSidebar quranMeta={quranMeta} listType={params.quranSegment} />
        </Suspense>
      </aside>
      <aside id="scroll-container" className="md:pl-[206px]">
        {children}
      </aside>
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
