import React from 'react';
import { QuranMeta, Reference } from '@/lib/types/quran-meta-types';

type ViewType = 'page' | 'juz' | 'hizb' | 'ruku';

interface GenericViewProps {
  quranMeta: QuranMeta;
  type: ViewType;
}

const GenericView: React.FC<GenericViewProps> = ({ quranMeta, type }) => {
  const getReferences = (): Reference[] => {
    const referenceMap = {
      page: quranMeta.pages.references,
      juz: quranMeta.juzs.references,
      hizb: quranMeta.hizbQuarters.references,
      ruku: quranMeta.rukus.references,
    };
    return referenceMap[type] || [];
  };

  const getTitle = (id: number): string => {
    const titleMap = {
      page: `Page ${id}`,
      juz: `Juz ${id}`,
      hizb: getHizbTitle(id),
      ruku: `Ruku ${id}`,
    };
    return titleMap[type];
  };

  const getHizbTitle = (id: number): string => {
    const hizbNumber = Math.ceil(id / 4);
    const quarter = (id - 1) % 4;
    const quarterTitles = ['', '1/4', '1/2', '3/4'];
    return quarter === 0 ? `Hizb ${hizbNumber}` : `${quarterTitles[quarter]} Hizb ${hizbNumber}`;
  };
  const references = getReferences();

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {references.map((reference: Reference) => (
        <ReferenceCard key={reference.id} reference={reference} title={getTitle(reference.id)} />
      ))}
    </div>
  );
};

interface ReferenceCardProps {
  reference: Reference;
  title: string;
}

const ReferenceCard: React.FC<ReferenceCardProps> = ({ reference, title }) => (
  <div className="flex cursor-pointer items-center justify-between rounded-full border border-neutral-200 bg-neutral p-2 pr-6 hover:shadow">
    <div className="flex gap-3">
      <div className="h-[52px] w-[52px] rounded-full bg-neutral-200 p-3 text-center text-xl font-bold">
        {reference.id}
      </div>
      <div>
        <p className="text-lg font-semibold text-brown-600">{title}</p>
        <p className="text-sm text-neutral-700">
          <span>{reference.surah_name}</span>
          <span>{reference.verse_key}</span>
        </p>
      </div>
    </div>
    <div>
      <p className="font-lateef text-2xl">{reference.starting_line}</p>
    </div>
  </div>
);

export default GenericView;
