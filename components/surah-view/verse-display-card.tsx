'use client';

import { Verse } from '@/lib/types/verses-type';
import type { Word as WordType } from '@/lib/types/wbw-type';
import Word from './word';
import { TranslationInfo, type SurahTranslation } from '@/lib/types/surah-translation-type';

type VerseDisplayProps = {
  verse: Verse & { words: WordType[] };
  combinedTranslations?: {
    info: TranslationInfo;
    translation: SurahTranslation;
  }[];
};

const VerseDisplayCard = ({ verse, combinedTranslations }: VerseDisplayProps) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral p-6">
      <p className=" text-lg">{verse.verse_number}</p>
      <div className="text-right font-lateef" dir="rtl">
        <div className="inline leading-[100px]">
          {verse.words.map(
            word => !(word.position === verse.words.length) && <Word key={word.id} word={word} />
          )}
        </div>
      </div>
      <div className="mt-2">
        {combinedTranslations?.map(translations => {
          const verseTranslation = translations.translation[verse.verse_number];
          return (
            <div key={translations.info.id}>
              <p className="text-xs text-neutral-500">{translations.info.author_name}</p>
              {verseTranslation?.text && (
                <div dangerouslySetInnerHTML={{ __html: verseTranslation?.text }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerseDisplayCard;
