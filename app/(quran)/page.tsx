import Banner from '@/components/banner';
import LastRead from '@/components/last-read';
import QuickLinks from '@/components/quick-links';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import QuranTabView from '@/components/quran-view/quran-tab-view';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { PAGES } from '@/data/quran-meta/pages';
import { JUZS } from '@/data/quran-meta/juzs';
import { HIZBS } from '@/data/quran-meta/hizbs';
import { RUKUS } from '@/data/quran-meta/rukus';

export default async function Home() {
  const surahs = SURAH_EN;
  const pages = PAGES;
  const juzs = JUZS;
  const hizbs = HIZBS;
  const rukus = RUKUS;

  const quranMeta: QuranMeta = { surahs, pages, juzs, hizbs: hizbs, rukus };

  return (
    <main className="mx-auto h-full max-w-8xl space-y-6 overflow-y-scroll p-6">
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
