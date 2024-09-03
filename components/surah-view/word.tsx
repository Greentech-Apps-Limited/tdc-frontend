'use client';

import { useSettings } from '@/contexts/settings-provider';
import { Word as WordType } from '@/lib/types/wbw-type';
import { calculateWbwFontSize } from '@/lib/utils/verse-utils';
import React from 'react';

type WordProps = {
  word: WordType;
};
const Word = ({ word }: WordProps) => {
  const { showByWords, arabicFont, arabicFontSize } = useSettings();
  const wbwFontSize = calculateWbwFontSize(arabicFontSize);

  return (
    <div className="inline-block text-center align-middle">
      <div
        className={`space-y-1  text-3xl ${showByWords ? 'px-4' : 'px-1'}`}
        style={{ fontSize: `${arabicFontSize}px`, lineHeight: `1.25em` }}
      >
        <p className={`font-${arabicFont}`}>{word.text_uthmani}</p>
        {showByWords && (
          <p
            className="font-source_sans_3 text-xs text-neutral-600"
            style={{ fontSize: `${wbwFontSize}px`, lineHeight: `1.25em` }}
          >
            {word.translation.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Word;
