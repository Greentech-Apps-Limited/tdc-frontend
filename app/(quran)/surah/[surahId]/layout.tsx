import { readData } from '@/lib/read-file';
import { QuranMeta } from '@/lib/types/quran-meta-types';

const SurahDetailsLayout = ({
  children,
  list,
}: Readonly<{ children: React.ReactNode; list: React.ReactNode }>) => {
  return (
    <section className="flex h-full w-full">
      <aside className="h-full overflow-hidden">{list}</aside>
      <aside className="h-full w-full flex-1 overflow-y-scroll">{children}</aside>
    </section>
  );
};

export default SurahDetailsLayout;

export async function generateStaticParams() {
  const quranMeta: QuranMeta = await readData<QuranMeta>('data/quran-meta.json');

  return quranMeta.surahs.references.map(surah => ({
    surahId: surah.id.toString(),
  }));
}
