import { SURAH_QUICK_LINKS } from '@/lib/constants/sura-quick-links-constants';

const QuickLinks = () => {
  return (
    <section className="max-w-[368px] space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Quick Links</p>
      <div className="flex w-full flex-wrap gap-2">
        {SURAH_QUICK_LINKS.map(surah => {
          return (
            <div
              key={surah.id}
              className="w-max cursor-pointer rounded-xl border border-neutral-200 px-3 py-1 text-sm text-neutral-950 hover:bg-neutral-100"
            >
              {surah.title}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default QuickLinks;
