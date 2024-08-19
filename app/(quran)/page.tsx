import Banner from '@/components/banner';
import LastRead from '@/components/last-read';
import QuickLinks from '@/components/quick-links';
import { QuranMeta, Reference, Surah } from '@/lib/types/quran-meta-types';
import QuranTabView from '@/components/quran-view/quran-tab-view';
import { readData } from '@/lib/read-file';

export default async function Home() {
  const surahs = await readData<Surah[]>('data/quran-meta/surahs/en.json');
  const [juzs, pages, hizbs, rukus] = await Promise.all([
    readData<Reference[]>('data/quran-meta/juzs.json'),
    readData<Reference[]>('data/quran-meta/pages.json'),
    readData<Reference[]>('data/quran-meta/hizbs.json'),
    readData<Reference[]>('data/quran-meta/rukus.json'),
  ]);

  const quranMeta: QuranMeta = { surahs, pages, juzs, hizbs: hizbs, rukus };

  return (
    <main className="mx-auto max-w-8xl space-y-6 p-6">
      <Banner />
      <section className="rounded-4xl border border-neutral-300 bg-neutral p-6">
        <div className="max-w-[504px] space-y-6">
          <QuickLinks />
          <LastRead />
        </div>
      </section>
      <QuranTabView quranMeta={quranMeta} />
    </main>
  );
}
