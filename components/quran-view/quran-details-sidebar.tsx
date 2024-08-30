'use client';

import { QuranMeta, Reference, Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { getReferences, getTitle } from '@/lib/utils/quran-segment-utils';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

type QuranDetailsSidebarProps = {
  quranMeta: QuranMeta;
  listType: QuranSegment;
};

const QuranDetailsSidebar = ({ quranMeta, listType }: QuranDetailsSidebarProps) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const params = useParams();
  const references = getReferences(quranMeta, listType);
  const searchParams = useSearchParams();

  const isSurah = (reference: Reference | Surah): reference is Surah => {
    return (reference as Surah).transliteration !== undefined;
  };

  const isActive = (id: number): boolean => params.segmentId === String(id);

  useEffect(() => {
    const activeLink = sidebarRef?.current?.querySelector('.active');
    if (activeLink) {
      activeLink.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }, [params.segmentId]);

  const renderReference = (reference: Reference | Surah) => (
    <div
      key={reference.id}
      className="w-full overflow-hidden rounded-full border border-neutral-100"
    >
      <Link
        href={
          searchParams?.toString()
            ? `/${listType}/${reference.id}?${searchParams.toString()}`
            : `/${listType}/${reference.id}`
        }
      >
        <div
          className={`flex cursor-pointer items-center gap-2 p-3 hover:bg-neutral-100 ${
            isActive(reference.id) ? 'active bg-neutral-100 font-semibold' : ''
          }`}
        >
          <p className="w-8 text-center text-neutral-600">{reference.id}</p>
          <p>{isSurah(reference) ? reference.transliteration : getTitle(listType, reference.id)}</p>
        </div>
      </Link>
    </div>
  );

  return (
    <section
      ref={sidebarRef}
      className="h-full w-[206px] overflow-y-scroll border-r border-neutral-200 bg-neutral p-4"
    >
      <div className="space-y-2">{references.map(renderReference)}</div>
    </section>
  );
};

export default QuranDetailsSidebar;
