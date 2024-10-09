'use client';

import { useEffect, useState } from 'react';
import { SURAH_QUICK_LINKS } from '@/lib/constants/sura-quick-links-constants';
import SmallCard from './ui/small-card';
import Link from 'next/link';

const QuickLinks = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="max-w-[368px] space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Quick Links</p>
      <div className="flex w-full flex-wrap gap-2">
        {SURAH_QUICK_LINKS.map((surah, index) => {
          return (
            <Link key={surah.id} href={surah.link}>
              <SmallCard
                className={`transition-all duration-500 ${
                  mounted ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
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
