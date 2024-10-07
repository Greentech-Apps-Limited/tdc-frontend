'use client';
import SmallCard from './ui/small-card';
import { formatTimeAgo } from '@/lib/utils/common-utils';
import useLastReadStore, { LastReadEntry } from '@/stores/last-read-store';
import Link from 'next/link';

const LastRead = () => {
  const { entries } = useLastReadStore();

  const getReadingLink = (item: LastReadEntry) => {
    switch (item.type) {
      case 'surah':
        return `/surah/${item.surah_id}/${item.ayah_id}`;
      case 'juz':
        return `/juz/${item.surah_id}/${item.ayah_id}`;
      case 'page':
        return `/page/${item.surah_id}`;
      case 'hizb':
        return `/hizb/${item.surah_id}/${item.ayah_id}`;
      case 'ruku':
        return `/ruku/${item.surah_id}/${item.ayah_id}`;
      default:
        return '/quran';
    }
  };

  const getDisplayText = (item: LastReadEntry) => {
    const surahName = item.surah_name
      ? `${item.surah_name} (${item.surah_id})`
      : `Surah ${item.surah_id}`;
    switch (item.type) {
      case 'surah':
        return `${surahName}: ${String(item.ayah_id).padStart(2, '0')}`;
      case 'juz':
        return `Juz ${item.surah_id}: Ayah ${item.ayah_id}`;
      case 'page':
        return `Page ${item.surah_id}`;
      case 'hizb':
        return `Hizb ${item.surah_id}: Ayah ${item.ayah_id}`;
      case 'ruku':
        return `Ruku ${item.surah_id}: Ayah ${item.ayah_id}`;
      default:
        return 'Unknown';
    }
  };

  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Last Read</p>
      <div className="flex w-full flex-wrap gap-2">
        {entries.map((item, index) => (
          <Link key={index} href={getReadingLink(item)}>
            <SmallCard>
              <div className="flex">
                <p>{getDisplayText(item)}</p>
              </div>
              <p className="text-xs font-normal text-neutral-500">
                {formatTimeAgo(item.timestamp)}
              </p>
            </SmallCard>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LastRead;
