import { readData } from '@/lib/read-file';
import { QuranMeta, Reference } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';

const QuranSegmentDetailsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode; list: React.ReactNode }>) => {
  return <section className="h-full w-full">{children}</section>;
};

export default QuranSegmentDetailsLayout;

export async function generateStaticParams() {
  const quranMeta: QuranMeta = await readData<QuranMeta>('data/quran-meta.json');

  const segmentMap: Record<QuranSegment, Reference[]> = {
    surah: quranMeta.surahs.references,
    page: quranMeta.pages.references,
    juz: quranMeta.juzs.references,
    hizb: quranMeta.hizbQuarters.references,
    ruku: quranMeta.rukus.references,
  };

  const staticParams = Object.entries(segmentMap).flatMap(([quranSegment, references]) => {
    return references.map(reference => ({
      quranSegment,
      segmentId: reference.id.toString(),
    }));
  });

  return staticParams;
}
