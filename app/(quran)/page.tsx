import Banner from '@/components/banner';
import QuickLinks from '@/components/quick-links';

export default function Home() {
  return (
    <main className="space-y-6">
      <Banner />
      <section className="rounded-4xl border border-neutral-300 bg-neutral p-6">
        <QuickLinks />
      </section>
    </main>
  );
}
