import { SURAH_QUICK_LINKS } from '@/lib/constants/sura-quick-links-constants';
import SmallCard from './ui/small-card';

const QuickLinks = () => {
  return (
    <section className="max-w-[368px] space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Quick Links</p>
      <div className="flex w-full flex-wrap gap-2">
        {SURAH_QUICK_LINKS.map(surah => {
          return (
            <SmallCard key={surah.id}>
              <p>{surah.title}</p>
            </SmallCard>
          );
        })}
      </div>
    </section>
  );
};

export default QuickLinks;
