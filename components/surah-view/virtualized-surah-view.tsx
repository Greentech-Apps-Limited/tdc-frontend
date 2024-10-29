'use client';
import { MergedVerse } from '@/lib/types/verses-type';
import { Components, Virtuoso } from 'react-virtuoso';
import { forwardRef } from 'react';
import { Surah } from '@/lib/types/quran-meta-types';
import TranslationView from './translation-view';
import { TranslationItem } from '@/lib/types/surah-translation-type';

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
  initialVerses: MergedVerse[];
  surahId: string;
  surah: Surah;
  totalVerseCount: number;
  translationIds: string[];
  translationInfos: TranslationItem[];
  verseLookup: string[];
  wbwTr: string;
  tafseerIds: string[];
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};
const VirtualizedSurahView = ({
  initialVerses,
  surahId,
  surah,
  totalVerseCount,
  translationIds,
  translationInfos,
  setApiPageToVersesMap,
  wbwTr,
  tafseerIds,
}: VirtualizedSurahViewProps) => {
  return (
    <div>
      <Virtuoso
        useWindowScroll
        totalCount={totalVerseCount}
        increaseViewportBy={1000}
        initialItemCount={1} // needed for SSR.
        itemContent={index => {
          return (
            <TranslationView
              wbwTr={wbwTr}
              tafseerIds={tafseerIds}
              verseIdx={index}
              totalVerseCount={totalVerseCount}
              surah={surah}
              surahId={surahId}
              initialVerses={initialVerses}
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
