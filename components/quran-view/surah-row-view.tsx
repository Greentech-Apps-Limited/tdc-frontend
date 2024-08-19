import { Surah } from '@/lib/types/quran-meta-types';
import Image from 'next/image';
import React from 'react';

const SurahRowView = ({ references }: { references: Surah[] }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {references.map(surah => {
        const { id, translation, transliteration } = surah;
        return (
          <div
            key={id}
            className="flex items-center justify-between rounded-full border border-neutral-200 bg-neutral p-2 pr-6"
          >
            <div className="flex gap-3">
              <div className="h-[52px] w-[52px] rounded-full bg-neutral-200 p-3 text-center text-xl font-bold">
                {id}
              </div>
              <div>
                <p className="text-lg font-semibold text-brown-600">{transliteration}</p>
                <p className="text-sm text-neutral-700">{translation}</p>
              </div>
            </div>
            <div className="relative h-[30px] w-[80px]">
              <Image
                src={`/images/surah/sname_${id}.webp`}
                alt={`Surah`}
                style={{
                  objectFit: 'contain',
                }}
                fill
                priority
                quality={100}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SurahRowView;
