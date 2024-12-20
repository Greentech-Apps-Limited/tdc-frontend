'use client';
import { useTranslations } from 'next-intl';
import SmallCard from './ui/small-card';
import { formatTimeAgo } from '@/lib/utils/common-utils';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import useLastReadStore, { LastReadEntry } from '@/stores/last-read-store';

import { useSearchParams } from 'next/navigation';
import { useNumberTranslation } from '@/hooks/use-number-translation';
import { Link } from '@/i18n/routing';

const LastRead = () => {
  const t = useTranslations('LastRead');
  const translateNumber = useNumberTranslation();
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
    newParams.set('verse', `${item.surah_id}-${item.ayah_id}`);
    const paramString = newParams.toString();
    return paramString ? `${baseLink}?${paramString}` : baseLink;
  };

  const getDisplayText = (item: LastReadEntry) => {
    const surah = SURAH_EN.find(s => s.id === item.surah_id);
    const surahName = surah
      ? `${surah.transliteration} : ${translateNumber(String(item.ayah_id).padStart(2, '0'))}`
      : `Surah ${translateNumber(item.surah_id)}`;
    return surahName;
  };

  const formatTimeAgoWithTranslation = (timestamp: number) => {
    const { value, unit, isYesterday } = formatTimeAgo(timestamp);
    if (isYesterday) {
      return t('timeAgo.yesterday');
    }
    return t(`timeAgo.${unit}`, { count: translateNumber(value) });
  };

  const entries = getAllEntries().slice(0, lastReadStore.maxEntriesPerSegment);

  return (
    <section className="space-y-2">
      <p className="text-xs font-semibold text-neutral-700">{t('title')}</p>
      {entries.length > 0 ? (
        <div className="flex w-full flex-wrap gap-2">
          {entries.map((item, index) => (
            <Link
              key={`${item.type}-${item.surah_id}-${item.ayah_id}-${index}`}
              href={getReadingLink(item)}
            >
              <SmallCard
                className={`animate-slideInStaggered opacity-0`}
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                <div className="flex">
                  <p>{getDisplayText(item)}</p>
                </div>
                <p className="text-xs font-normal text-neutral-500">
                  {formatTimeAgoWithTranslation(item.timestamp)}
                </p>
              </SmallCard>
            </Link>
          ))}
        </div>
      ) : (
        <div
          className="animate-slideInStaggered opacity-0"
          style={{ animationFillMode: 'forwards' }}
        >
          <SmallCard>
            <p className="text-sm text-neutral-500">{t('noRecentReadings')}</p>
            <p className="text-xs font-normal text-neutral-400">
              {t('noRecentReadingsDescription')}
            </p>
          </SmallCard>
        </div>
      )}
    </section>
  );
};

export default LastRead;
