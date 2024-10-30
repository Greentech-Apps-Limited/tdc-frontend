'use client';
import { QuranMeta, Reference, Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { scrollToElement } from '@/lib/utils/common-utils';
import { getReferences, getTitle } from '@/lib/utils/quran-segment-utils';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useNumberTranslation } from '@/hooks/use-number-translation';

type QuranDetailsSidebarProps = {
  quranMeta: QuranMeta;
  listType: QuranSegment;
};

const QuranDetailsSidebar = ({ quranMeta, listType }: QuranDetailsSidebarProps) => {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const params = useParams();
  const references = getReferences(quranMeta, listType);
  const t = useTranslations('Views');
  const translateNumber = useNumberTranslation();

  const isSurah = (reference: Reference | Surah): reference is Surah => {
    return (reference as Surah).transliteration !== undefined;
  };

  const isActive = (id: number): boolean => params.segmentId === String(id);

  useEffect(() => {
    if (sidebarRef.current) {
      const activeLink = sidebarRef.current.querySelector('.active');
      if (activeLink instanceof HTMLElement) {
        scrollToElement({
          container: sidebarRef.current,
          element: activeLink,
          offset: 0.01,
        });
      }
    }
  }, [params.segmentId]);

  const renderReference = (reference: Reference | Surah) => (
    <div
      key={reference.id}
      className="w-full overflow-hidden rounded-full border border-neutral-100"
    >
      <Link href={`/${listType}/${reference.id}`}>
        <div
          className={`flex cursor-pointer items-center gap-2 p-3 hover:bg-neutral-100 ${
            isActive(reference.id) ? 'active bg-neutral-100 font-semibold' : ''
          }`}
        >
          <p className="w-8 text-center text-neutral-600">{translateNumber(reference.id)}</p>
          <p>
            {isSurah(reference)
              ? reference.transliteration
              : getTitle(listType, reference.id, t, translateNumber)}
          </p>
        </div>
      </Link>
    </div>
  );

  return (
    <section
      ref={sidebarRef}
      className="h-[calc(100vh-4rem)] w-[206px] overflow-y-auto border-r border-neutral-200 bg-neutral p-4"
    >
      <div className="space-y-2">{references.map(renderReference)}</div>
    </section>
  );
};

export default QuranDetailsSidebar;
