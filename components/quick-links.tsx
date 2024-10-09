import { SURAH_QUICK_LINKS } from '@/lib/constants/sura-quick-links-constants';
import SmallCard from './ui/small-card';
import Link from 'next/link';

const QuickLinks = () => {
  return (
    <section className="max-w-[368px] space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Quick Links</p>
      <div className="flex w-full flex-wrap gap-2">
        {SURAH_QUICK_LINKS.map((surah, index) => {
          return (
            <Link key={surah.id} href={surah.link}>
              <SmallCard
                className={`animate-slideInStaggered opacity-0`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <p>{surah.title}</p>
              </SmallCard>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default QuickLinks;
