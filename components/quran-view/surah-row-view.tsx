'use client';

import { useNumberTranslation } from '@/hooks/use-number-translation';
import { Surah } from '@/lib/types/quran-meta-types';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import React, { useCallback, useEffect, useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { GridComponents } from './virtualized-grid';
import { SurahRowSkeleton } from '../skeleton-loaders/home-page-skeleton';
import { KabaIcon, MadinaIcon } from '@/icons';
import SurahNameIconComponent from '../ui/surah-name-icon-component';

const SurahRowView = ({ references }: { references: Surah[] }) => {
  const t = useTranslations('SurahTranslation');
  const translateNumber = useNumberTranslation();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const itemContent = useCallback(
    (index: number) => {
      const surah = references[index];
      if (!surah) return null;

      const { id, transliteration, revelation } = surah;

      return (
        <Link key={id} href={`/surah/${id}`} className="block">
          <div className="flex items-center justify-between rounded-full border border-neutral-200 bg-neutral p-2 transition-shadow duration-200 hover:shadow">
            <div className="flex gap-3">
              <div className="h-[52px] w-[52px] rounded-full bg-neutral-200 p-3 text-center text-xl font-bold">
                {translateNumber(id)}
              </div>
              <div>
                <p className="text-lg font-semibold text-brown-600">{transliteration}</p>
                <div className="flex items-center gap-1">
                  <p className="text-sm text-neutral-700">{t(`sura_${id}`)}</p>
                  {revelation === 1 ? <KabaIcon /> : <MadinaIcon />}
                </div>
              </div>
            </div>
            <div>
              <SurahNameIconComponent
                surahNumber={id}
                className="h-[50px] w-[108px] text-neutral-900"
              />
            </div>
          </div>
        </Link>
      );
    },
    [t, translateNumber]
  );

  if (!isInitialized) {
    return <SurahRowSkeleton />;
  }

  return (
    <div className="min-h-screen">
      <VirtuosoGrid
        useWindowScroll
        totalCount={references.length}
        components={GridComponents}
        itemContent={itemContent}
        className="w-full"
      />
    </div>
  );
};

export default SurahRowView;
