'use client';

import { QuranMeta, Reference } from '@/lib/types/quran-meta-types';
import Link from 'next/link';
import { getReferences, getTitle } from '@/lib/utils/quran-segment-utils';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useNumberTranslation } from '@/hooks/use-number-translation';

type ViewType = 'page' | 'juz' | 'hizb' | 'ruku';

type GenericViewProps = {
  quranMeta: QuranMeta;
  type: ViewType;
};

const GenericView = ({ quranMeta, type }: GenericViewProps) => {
  const t = useTranslations('Views');
  const translateNumber = useNumberTranslation();
  const references = getReferences(quranMeta, type);
  const searchParams = useSearchParams();

  const getFilteredSearchParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('verse');
    return params.toString();
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {references.map((reference: Reference) => {
        const filteredParams = getFilteredSearchParams();
        return (
          <Link
            key={reference.id}
            href={
              filteredParams
                ? `/${type}/${reference.id}?${filteredParams}`
                : `/${type}/${reference.id}`
            }
          >
            <ReferenceCard
              reference={reference}
              title={getTitle(type, reference.id, t, translateNumber)}
              translateNumber={translateNumber}
            />
          </Link>
        );
      })}
    </div>
  );
};

type ReferenceCardProps = {
  reference: Reference;
  title: string;
  translateNumber: (num: number) => string;
};

const ReferenceCard = ({ reference, title, translateNumber }: ReferenceCardProps) => {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-full border border-neutral-200 bg-neutral p-2 pr-6 hover:shadow">
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
        <p className="font-lateef text-2xl">{reference.starting_line}</p>
      </div>
    </div>
  );
};

export default GenericView;
