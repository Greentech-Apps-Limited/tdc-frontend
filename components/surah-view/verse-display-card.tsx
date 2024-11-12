'use client';

import { useSettings } from '@/contexts/settings-provider';
import { useNumberTranslation } from '@/hooks/use-number-translation';
import useQuranReader from '@/stores/quran-reader-state';
import VerseDisplayOptions from './verse-display-options';
import { MergedVerse } from '@/lib/types/verses-type';
import WordDetailsDialog from './word-details-dialog';

type VerseDisplayProps = {
  verse: MergedVerse;
  isLastVerse?: boolean;
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};

const VerseDisplayCard = ({ verse, isLastVerse, setApiPageToVersesMap }: VerseDisplayProps) => {
  const { showTranslation, showByWords, translationFontSize } = useSettings();
  const { highlightedVerse, showAudioPlayer } = useQuranReader();
  const translateNumber = useNumberTranslation();

  const surahId = verse.verse_key.split(':')[0];
  return (
    <div
      className={`rounded-2xl border border-neutral-200 p-4 md:p-6 ${
        highlightedVerse === verse.verse_key && showAudioPlayer ? 'bg-neutral-100' : 'bg-neutral'
      } ${isLastVerse ? 'my-4 md:my-6' : 'mt-4 md:mt-6'}`}
      data-verse={verse.verse_key}
      data-words={verse.words.length}
    >
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm md:text-lg">{translateNumber(verse.no)}</p>
        <VerseDisplayOptions
          surahId={surahId}
          verseKey={verse.verse_key}
          verse={verse}
          setApiPageToVersesMap={setApiPageToVersesMap}
        />
      </div>
      <div className="text-right font-lateef" dir="rtl">
        <div
          className={`inline ${showByWords ? 'leading-[50px] md:leading-[100px]' : ' leading-[30px] md:leading-[60px]'}`}
        >
          {verse.words.map(word => (
            <WordDetailsDialog key={word.id} word={word} />
          ))}
        </div>
      </div>
      {showTranslation && (
        <div className="mt-2 space-y-5">
          {verse.combinedTranslations?.map(({ info, text }) => (
            <div key={info?.id}>
              <p className="text-xs text-neutral-500">{info?.name}</p>
              {text && (
                <div
                  dangerouslySetInnerHTML={{ __html: text }}
                  style={{ fontSize: `${translationFontSize}px`, lineHeight: '1.25em' }}
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
