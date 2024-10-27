'use client';
import { MergedVerse } from '@/lib/types/verses-type';
import { Components, Virtuoso } from 'react-virtuoso';
import VerseDisplayCard from './verse-display-card';
import { forwardRef } from 'react';
import { Surah } from '@/lib/types/quran-meta-types';

const List: Components['List'] = forwardRef(({ style, children }, ref) => {
  return (
    <div
      className="m-6  space-y-6 rounded-4xl border border-neutral-300 bg-neutral p-6 shadow"
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
});

List.displayName = 'List';

type VirtualizedSurahViewProps = {
  verses: MergedVerse[];
  surahId: string;
  surah: Surah;
};
const VirtualizedSurahView = ({ verses, surahId, surah }: VirtualizedSurahViewProps) => {
  const versesCount = verses.length;
  const itemContentRenderer = (verseIdx: number) => {
    const verse = verses[verseIdx];
    if (!verse) {
      return null;
    }
    return (
      <div>
        {verseIdx === 0 ? (
          <div>
            <h1 className="mt-6 font-hidayatullah_demo text-3xl font-bold">
              {surah.transliteration}
            </h1>
            <VerseDisplayCard verse={verse} surahId={surahId} />
          </div>
        ) : (
          <VerseDisplayCard
            verse={verse}
            surahId={surahId}
            isLastVerse={verses.length - 1 === verseIdx}
          />
        )}
      </div>
    );
  };

  return (
    <div>
      <Virtuoso
        useWindowScroll
        totalCount={versesCount}
        increaseViewportBy={1000}
        initialItemCount={1} // needed for SSR.
        itemContent={itemContentRenderer}
        components={{
          List,
        }}
      />
    </div>
  );
};

export default VirtualizedSurahView;
