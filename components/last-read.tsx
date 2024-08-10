'use client';

import { formatTimeAgo } from '@/lib/utils';
import SmallCard from './ui/small-card';
import { LastReadData } from '@/lib/types/last-read-types';

// TODO: Update Functionality with real data and map surah names with surah ID.
const LastRead = () => {
  const lastReadData = JSON?.parse(localStorage.getItem('LAST_READ_LOCAL') || '{}') as LastReadData;

  const surahList = Object.values(lastReadData.surah || {}).sort(
    (a, b) => b.timestamp - a.timestamp
  );

  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Last Read</p>
      <div className="flex w-full flex-wrap gap-2">
        {surahList.map((item, index) => (
          <SmallCard key={index}>
            <div className="flex">
              <p>Surah {item.surah_id}</p>
              <p>: {String(item.ayah_id).padStart(2, '0')}</p>
            </div>
            <p className="text-xs font-normal text-neutral-500">{formatTimeAgo(item.timestamp)}</p>
          </SmallCard>
        ))}
      </div>
    </section>
  );
};

export default LastRead;
