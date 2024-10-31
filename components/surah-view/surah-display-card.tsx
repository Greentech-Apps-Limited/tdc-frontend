'use client';

import React from 'react';
import { Surah } from '@/lib/types/quran-meta-types';

type SurahDisplayCardProps<TSurah extends Surah> = {
  surah: TSurah;
  children: React.ReactNode;
};

const SurahDisplayCard = <TSurah extends Surah>({
  surah,
  children,
}: SurahDisplayCardProps<TSurah>) => {
  return (
    <div className="m-6  space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-6 shadow">
      <h1 className="font-hidayatullah_demo text-3xl font-bold">{surah.transliteration}</h1>
      {children}
    </div>
  );
};

export default SurahDisplayCard;
