import Banner from '@/components/banner';
import LastRead from '@/components/last-read';
import QuickLinks from '@/components/quick-links';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import QuranTabView from '@/components/quran-view/quran-tab-view';
import { readData } from '@/lib/read-file';

export default async function Home() {
  const quranMeta: QuranMeta = await readData<QuranMeta>('data/quran-meta.json');

  return (
    <main className="space-y-6">
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
