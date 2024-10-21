import QuranDetailsSidebar from '@/components/quran-view/quran-details-sidebar';
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
    <section className="flex h-full w-full">
      <aside className="h-full overflow-hidden">
        <Suspense fallback={<div>Loading...</div>}>
          <QuranDetailsSidebar quranMeta={quranMeta} listType={params.quranSegment} />
        </Suspense>
      </aside>
      <aside id="scroll-container" className="h-full w-full flex-1 overflow-y-scroll ">
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
