'use client';
import SmallCard from './ui/small-card';
import { formatTimeAgo } from '@/lib/utils/common-utils';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import useLastReadStore, { LastReadEntry } from '@/stores/last-read-store';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const LastRead = () => {
  const lastReadStore = useLastReadStore();
  const searchParams = useSearchParams();
  const segmentTypes = ['surah', 'juz', 'page', 'hizb', 'ruku'] as const;

  const getAllEntries = () => {
    return segmentTypes
      .flatMap(segmentType => Object.values(lastReadStore[segmentType]))
      .sort((a, b) => b.timestamp - a.timestamp);
  };

  const getReadingLink = (item: LastReadEntry) => {
    const baseLink = `/${item.type}/${item.segment_id}`;
    const newParams = new URLSearchParams(searchParams);

    // Always set the verse parameter to the item's surah_id and ayah_id
    newParams.set('verse', `${item.surah_id}-${item.ayah_id}`);

    const paramString = newParams.toString();
    return paramString ? `${baseLink}?${paramString}` : baseLink;
  };

  const getDisplayText = (item: LastReadEntry) => {
    const surah = SURAH_EN.find(s => s.id === item.surah_id);
    const surahName = surah
      ? `${surah.transliteration} : ${String(item.ayah_id).padStart(2, '0')}`
      : `Surah ${item.surah_id}`;
    return surahName;
  };

  const entries = getAllEntries().slice(0, lastReadStore.maxEntriesPerSegment);

  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold text-neutral-700">Last Read</p>
      <div className="flex w-full flex-wrap gap-2">
        {entries.map((item, index) => (
          <Link
            key={`${item.type}-${item.surah_id}-${item.ayah_id}-${index}`}
            href={getReadingLink(item)}
          >
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
