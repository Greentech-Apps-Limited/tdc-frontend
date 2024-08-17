'use client';

import { QuranMeta, Reference, Surah } from '@/lib/types/quran-meta-types';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type QuranDetailsSidebarProps = {
  quranMeta: QuranMeta;
  listType: 'surah' | 'page' | 'juz' | 'hizb' | 'ruku';
};

const QuranDetailsSidebar = ({ quranMeta, listType }: QuranDetailsSidebarProps) => {
  const params = useParams();
  const paramKeyMap: Record<typeof listType, string> = {
    surah: 'surahId',
    page: 'pageId',
    juz: 'juzId',
    hizb: 'hizbId',
    ruku: 'rukuId',
  };

  const getReferences = (): Reference[] | Surah[] => {
    const referenceMap = {
      page: quranMeta.pages.references,
      juz: quranMeta.juzs.references,
      hizb: quranMeta.hizbQuarters.references,
      ruku: quranMeta.rukus.references,
      surah: quranMeta.surahs.references,
    };
    return referenceMap[listType] || [];
  };
  const references = getReferences();

  const isSurah = (reference: Reference | Surah): reference is Surah => {
    return (reference as Surah).transliteration !== undefined;
  };

  const isActive = (id: number): boolean => params[paramKeyMap[listType]] === String(id);
  return (
    <section className="h-full w-[196px] overflow-y-scroll border-r border-neutral-200 bg-neutral p-4">
      <div className="space-y-2">
        {references.map(reference => {
          if (listType === 'surah' && isSurah(reference)) {
            return (
              <div
                key={reference.id}
                className="w-full overflow-hidden rounded-full border border-neutral-100"
              >
                <Link href={`/${listType}/${reference.id}`}>
                  <div
                    className={`flex cursor-pointer items-center gap-2 p-3 hover:bg-neutral-100 ${isActive(reference.id) ? 'bg-neutral-100 font-semibold' : ''}`}
                  >
                    <p className="w-8 text-center text-neutral-600">{reference.id}</p>
                    <p>{reference.transliteration}</p>
                  </div>
                </Link>
              </div>
            );
          } else if (!isSurah(reference)) {
            return (
              <div
                key={reference.id}
                className="flex w-full items-center gap-2 rounded-full border border-neutral-100 p-3 font-semibold hover:bg-neutral-100"
              >
                <p className="w-8 text-center text-neutral-600">{reference.id}</p>
                <p>{reference.surah_name || 'Reference'}</p>
              </div>
            );
          }
        })}
      </div>
    </section>
  );
};

export default QuranDetailsSidebar;
