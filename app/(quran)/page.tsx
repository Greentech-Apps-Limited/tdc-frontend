import { promises as fs } from 'fs';
import path from 'path';
import Banner from '@/components/banner';
import LastRead from '@/components/last-read';
import QuickLinks from '@/components/quick-links';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import QuranTabView from '@/components/quran-view/quran-tab-view';

export default async function Home() {
  const filePath = path.resolve('data', 'quran-meta.json');
  const data = await fs.readFile(filePath, 'utf-8');
  const quranMeta: QuranMeta = JSON.parse(data);

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
