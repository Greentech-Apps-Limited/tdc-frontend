'use client';
import { Reference, Surah } from '@/lib/types/quran-meta-types';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { getTitle } from '@/lib/utils/quran-segment-utils';
import { Link } from '@/i18n/routing';
import { useParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useNumberTranslation } from '@/hooks/use-number-translation';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { loadQuranMetadata } from '@/lib/utils/quran-meta';
import { QuranDetailsSidebarSkeleton } from '../skeleton-loaders/sidebar-skeleton';

type QuranDetailsSidebarProps = {
  listType: QuranSegment;
};

const QuranDetailsSidebar = ({ listType }: QuranDetailsSidebarProps) => {
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const params = useParams();
  const t = useTranslations('Views');
  const translateNumber = useNumberTranslation();
  const [initialScrollDone, setInitialScrollDone] = useState(false);
  const [references, setReferences] = useState<(Reference | Surah)[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadQuranMetadata(listType).then(data => {
      if (data) {
        setReferences(data);
      }
      setIsLoading(false);
    });
  }, [listType]);

  const isSurah = (reference: Reference | Surah): reference is Surah => {
    return (reference as Surah).transliteration !== undefined;
  };

  const isActive = (id: number): boolean => params.segmentId === String(id);
  useEffect(() => {
    const scrollToActiveIndex = () => {
      if (!virtuosoRef.current || !params.segmentId) return;

      const activeIndex = references.findIndex(ref => String(ref.id) === params.segmentId);

      if (activeIndex !== -1) {
        virtuosoRef.current.scrollToIndex({
          index: activeIndex,
          align: 'start',
          behavior: initialScrollDone ? 'smooth' : 'auto',
        });

        if (!initialScrollDone) {
          setInitialScrollDone(true);
        }
      }
    };

    scrollToActiveIndex();
  }, [params.segmentId, references, initialScrollDone]);

  const renderReference = (index: number) => {
    const reference = references[index];
    if (!reference) {
      return null;
    }

    return (
      <div
        key={reference.id}
        className="m-2 overflow-hidden rounded-full border border-neutral-100"
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
  };

  if (isLoading) {
    return <QuranDetailsSidebarSkeleton />;
  }

  return (
    <section className="h-[calc(100vh-4rem)] w-[206px] border-r border-neutral-200 bg-neutral">
      <Virtuoso
        ref={virtuosoRef}
        style={{ height: '100%' }}
        totalCount={references.length}
        itemContent={renderReference}
        overscan={10}
        initialTopMostItemIndex={references.findIndex(ref => String(ref.id) === params.segmentId)}
      />
    </section>
  );
};

export default QuranDetailsSidebar;
