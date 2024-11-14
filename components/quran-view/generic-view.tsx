'use client';
import { QuranMeta, Reference } from '@/lib/types/quran-meta-types';
import { Link } from '@/i18n/routing';
import { getReferences, getTitle } from '@/lib/utils/quran-segment-utils';
import { useTranslations } from 'next-intl';
import { useNumberTranslation } from '@/hooks/use-number-translation';
import React, { useCallback } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';
import { GridComponents } from './virtualized-grid';
import { useSettings } from '@/contexts/settings-provider';

type ViewType = 'page' | 'juz' | 'hizb' | 'ruku';

type ReferenceCardProps = {
  reference: Reference;
  title: string;
  translateNumber: (num: number) => string;
};

const ReferenceCard = ({ reference, title, translateNumber }: ReferenceCardProps) => {
  const { arabicFont } = useSettings();
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-full border border-neutral-200 bg-neutral p-2 pr-6 transition-shadow duration-200 hover:shadow">
      <div className="flex gap-3">
        <div className="h-[52px] w-[52px] rounded-full bg-neutral-200 p-3 text-center text-xl font-bold">
          {translateNumber(reference.id)}
        </div>
        <div>
          <p className="text-lg font-semibold text-brown-600">{title}</p>
          <p className="text-sm text-neutral-700">
            <span>{reference.surah_name}</span>
            <span className="px-1">{reference.verse_key}</span>
          </p>
        </div>
      </div>
      <div>
        <p className="font-lateef text-xl" style={{ fontFamily: `var(--font-${arabicFont})` }}>
          {reference.starting_line}
        </p>
      </div>
    </div>
  );
};

const GenericView = ({ quranMeta, type }: { quranMeta: QuranMeta; type: ViewType }) => {
  const t = useTranslations('Views');
  const translateNumber = useNumberTranslation();
  const references = getReferences(quranMeta, type);

  const itemContent = useCallback(
    (index: number) => {
      const reference = references[index];
      if (!reference) return null;

      return (
        <Link key={reference.id} href={`/${type}/${reference.id}`} className="block">
          <ReferenceCard
            reference={reference}
            title={getTitle(type, reference.id, t, translateNumber)}
            translateNumber={translateNumber}
          />
        </Link>
      );
    },
    [type, t, translateNumber, references]
  );

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

export default GenericView;
