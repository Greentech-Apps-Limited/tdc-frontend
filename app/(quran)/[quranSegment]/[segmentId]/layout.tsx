import { readData } from '@/lib/read-file';
import { Reference, Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';

const QuranSegmentDetailsLayout = ({
  children,
}: Readonly<{ children: React.ReactNode; list: React.ReactNode }>) => {
  return <section className="h-full w-full">{children}</section>;
};

export default QuranSegmentDetailsLayout;

export async function generateStaticParams() {
  const surahs = await readData<Surah[]>('data/quran-meta/surahs/en.json');
  const [juzs, pages, hizbs, rukus] = await Promise.all([
    readData<Reference[]>('data/quran-meta/juzs.json'),
    readData<Reference[]>('data/quran-meta/pages.json'),
    readData<Reference[]>('data/quran-meta/hizbs.json'),
    readData<Reference[]>('data/quran-meta/rukus.json'),
  ]);

  const segmentMap: Record<QuranSegment, Reference[] | Surah[]> = {
    surah: surahs,
    page: pages,
    juz: juzs,
    hizb: hizbs,
    ruku: rukus,
  };

  const staticParams = Object.entries(segmentMap).flatMap(([quranSegment, references]) => {
    return references.map(reference => ({
      quranSegment,
      segmentId: reference.id.toString(),
    }));
  });

  return staticParams;
}
