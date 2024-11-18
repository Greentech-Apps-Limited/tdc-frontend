'use client';
import { MergedVerse } from '@/lib/types/verses-type';
import { Components, Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { forwardRef, useRef } from 'react';
import TranslationView from './translation-view';
import useScrollToVerse from '@/hooks/use-scroll-to-verse';
import { useVerseContext } from '@/contexts/verse-provider';

const List: Components['List'] = forwardRef(({ style, children }, ref) => {
  return (
    <div
      className="m-4 space-y-4 rounded-3xl border border-neutral-300 bg-neutral p-4 shadow md:m-6 md:space-y-6 md:rounded-4xl md:p-6"
      ref={ref}
      style={style}
    >
      {children}
    </div>
  );
});

List.displayName = 'List';

const Footer: Components['Footer'] = forwardRef(() => {
  return <div className="h-48 md:h-52" />;
});

Footer.displayName = 'Footer';

type VirtualizedSurahViewProps = {
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};
const VirtualizedSurahView = ({ setApiPageToVersesMap }: VirtualizedSurahViewProps) => {
  const { initialVerses, totalVerseCount, verseLookup } = useVerseContext();
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  // Pass initialVerses to the hook
  useScrollToVerse({ verseLookup, virtuosoRef, initialVerses });

  return (
    <div>
      <Virtuoso
        ref={virtuosoRef}
        useWindowScroll
        totalCount={totalVerseCount}
        increaseViewportBy={1000}
        initialItemCount={1}
        itemContent={index => {
          return <TranslationView verseIdx={index} setApiPageToVersesMap={setApiPageToVersesMap} />;
        }}
        components={{
          List,
          Footer,
        }}
      />
    </div>
  );
};

export default VirtualizedSurahView;
