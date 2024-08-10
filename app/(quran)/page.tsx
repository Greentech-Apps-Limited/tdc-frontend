import Banner from '@/components/banner';
import LastRead from '@/components/last-read';
import QuickLinks from '@/components/quick-links';

export default function Home() {
  return (
    <main className="space-y-6">
      <Banner />
      <section className="rounded-4xl border border-neutral-300 bg-neutral p-6">
        <div className="max-w-[504px] space-y-6">
          <QuickLinks />
          <LastRead />
        </div>
      </section>
    </main>
  );
}
