'use client';
import { MergedVerse, SurahPosition } from '@/lib/types/verses-type';
import { Components, Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { forwardRef, useRef } from 'react';
import TranslationView from './translation-view';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import useScrollToVerse from '@/hooks/use-scroll-to-verse';

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

type VirtualizedSurahViewProps = {
  initialVerses: MergedVerse[];
  totalVerseCount: number;
  translationIds: string[];
  translationInfos: TranslationItem[];
  verseLookup: string[];
  wbwTr: string;
  tafseerIds: string[];
  surahInfos: SurahPosition[];
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};
const VirtualizedSurahView = ({
  initialVerses,
  totalVerseCount,
  translationIds,
  translationInfos,
  setApiPageToVersesMap,
  wbwTr,
  tafseerIds,
  surahInfos,
  verseLookup,
}: VirtualizedSurahViewProps) => {
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
          return (
            <TranslationView
              verseIdx={index}
              totalVerseCount={totalVerseCount}
              initialVerses={initialVerses}
              surahInfos={surahInfos}
              wbwTr={wbwTr}
              tafseerIds={tafseerIds}
              translationIds={translationIds}
              translationInfos={translationInfos}
              setApiPageToVersesMap={setApiPageToVersesMap}
            />
          );
        }}
        components={{
          List,
        }}
      />
    </div>
  );
};

export default VirtualizedSurahView;
