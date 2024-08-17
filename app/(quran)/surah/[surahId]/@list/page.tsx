import { readData } from '@/lib/read-file';
import { QuranMeta } from '@/lib/types/quran-meta-types';
import React from 'react';

const SurahList = async () => {
  const quranMeta: QuranMeta = await readData<QuranMeta>('data/quran-meta.json');
  return (
    <section className="h-full w-[196px] overflow-y-scroll border-r border-neutral-200 bg-neutral p-4">
      <div className="space-y-2">
        {quranMeta.surahs.references.map(surah => {
          return (
            <div
              key={surah.id}
              className="flex w-full items-center gap-2 rounded-full border border-neutral-100 p-3 font-semibold hover:bg-neutral-100"
            >
              <p className="w-8 text-center text-neutral-600">{surah.id}</p>
              <p>{surah.transliteration}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default SurahList;
