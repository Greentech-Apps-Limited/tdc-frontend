'use client';
import { MergedVerse } from '@/lib/types/verses-type';
import { Virtuoso } from 'react-virtuoso';
import VerseDisplayCard from './verse-display-card';

type VirtualizedSurahViewProps = {
  verses: MergedVerse[];
  surahId: string;
};
const VirtualizedSurahView = ({ verses, surahId }: VirtualizedSurahViewProps) => {
  const versesCount = verses.length;
  const itemContentRenderer = (verseIdx: number) => {
    const verse = verses[verseIdx];
    if (!verse) {
      return null;
    }
    return <VerseDisplayCard verse={verse} surahId={surahId} />;
  };

  return (
    <div>
      <Virtuoso
        useWindowScroll
        totalCount={versesCount}
        increaseViewportBy={1000}
        initialItemCount={1} // needed for SSR.
        itemContent={itemContentRenderer}
      />
    </div>
  );
};

export default VirtualizedSurahView;
