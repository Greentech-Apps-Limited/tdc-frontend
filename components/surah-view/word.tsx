'use client';

import { useSettings } from '@/contexts/settings-provider';
import { QuranWord } from '@/lib/types/verses-type';
import { calculateWbwFontSize } from '@/lib/utils/verse-utils';

type WordProps = {
  word: QuranWord;
};

const Word = ({ word }: WordProps) => {
  const { showByWords, arabicFont, arabicFontSize } = useSettings();
  const wbwFontSize = calculateWbwFontSize(arabicFontSize);

  return (
    <div className="inline-block text-center align-middle">
      <div className={`space-y-1 text-3xl ${showByWords ? 'px-1 md:px-3' : 'px-0'}`}>
        <p
          style={{
            fontFamily: `var(--font-${arabicFont})`,
            fontSize: `${arabicFontSize}px`,
            lineHeight: '2em',
          }}
        >
          {word.text_uthmani}
        </p>
        {showByWords && word.translation && (
          <p
            dir="ltr"
            className="font-source_sans_3 text-xs text-neutral-600"
            style={{ fontSize: `${wbwFontSize}px`, lineHeight: '1.5em' }}
          >
            {word.translation}
          </p>
        )}
      </div>
    </div>
  );
};

export default Word;
