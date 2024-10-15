'use client';

import { Verse } from '@/lib/types/verses-type';
import type { Word as WordType } from '@/lib/types/wbw-type';
import Word from './word';
import { TranslationInfo } from '@/lib/types/surah-translation-type';
import { useSettings } from '@/contexts/settings-provider';
import VerseDisplayOptions from './verse-display-options';
import useQuranReader from '@/stores/quran-reader-state';
import { useNumberTranslation } from '@/hooks/use-number-translation';

type VerseDisplayProps = {
  surahId: string;
  verse: Verse & {
    words: WordType[];
    combinedTranslations?: {
      info: TranslationInfo;
      text: string;
    }[];
  };
};
const VerseDisplayCard = ({ verse, surahId }: VerseDisplayProps) => {
  const { showTranslation, showByWords, translationFontSize } = useSettings();
  const { highlightedVerse, showAudioPlayer } = useQuranReader();
  const translateNumber = useNumberTranslation();
  return (
    <div
      className={`rounded-2xl border border-neutral-200 p-6 ${highlightedVerse === verse.verse_key && showAudioPlayer ? 'bg-neutral-100' : 'bg-neutral'}`}
      data-verse={verse.verse_key}
      data-words={verse.words.length - 1}
    >
      <div className="flex items-center justify-between">
        <p className=" text-lg">{translateNumber(verse.verse_number)}</p>
        <VerseDisplayOptions surahId={surahId} verseKey={verse.verse_key} />
      </div>

      <div className="text-right font-lateef" dir="rtl">
        <div className={`inline  ${showByWords ? 'leading-[100px]' : 'leading-[60px]'}`}>
          {verse.words.map(
            word => !(word.position === verse.words.length) && <Word key={word.id} word={word} />
          )}
        </div>
      </div>
      {showTranslation && (
        <div className="mt-2 space-y-5">
          {verse.combinedTranslations?.map(({ info, text }) => (
            <div key={info.id}>
              <p className="text-xs text-neutral-500">{info.name}</p>
              {text && (
                <div
                  dangerouslySetInnerHTML={{ __html: text }}
                  style={{ fontSize: `${translationFontSize}px`, lineHeight: `1.25em` }}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VerseDisplayCard;
