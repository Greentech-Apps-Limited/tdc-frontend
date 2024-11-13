import React, { createContext, useContext } from 'react';
import { MergedVerse, SurahPosition } from '@/lib/types/verses-type';
import { TranslationItem } from '@/lib/types/surah-translation-type';
import { QuranSegment } from '@/lib/types/quran-segment-type';

interface VerseContextType {
  initialVerses: MergedVerse[];
  verseLookup: string[];
  totalVerseCount: number;
  surahInfos: SurahPosition[];

  translationIds: string[];
  translationInfos: TranslationItem[];
  tafseerIds: string[];
  wbwTr: string;

  quranSegment: QuranSegment;
  segmentId: string;
}

const VerseContext = createContext<VerseContextType | null>(null);

export const VerseProvider: React.FC<{
  children: React.ReactNode;
  initialData: Omit<VerseContextType, 'apiPageToVersesMap' | 'setApiPageToVersesMap'>;
}> = ({ children, initialData }) => {
  const value = {
    ...initialData,
  };

  return <VerseContext.Provider value={value}>{children}</VerseContext.Provider>;
};

export const useVerseContext = () => {
  const context = useContext(VerseContext);
  if (!context) {
    throw new Error('useVerseContext must be used within a VerseProvider');
  }
  return context;
};
