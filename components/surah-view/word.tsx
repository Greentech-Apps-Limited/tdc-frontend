'use client';

import { Word as WordType } from '@/lib/types/wbw-types';
import React from 'react';

type WordProps = {
  word: WordType;
};
const Word = ({ word }: WordProps) => {
  return (
    <div className="inline-block text-center align-middle">
      <div className="space-y-2 px-4 text-3xl">
        <p>{word.text_uthmani}</p>
        <p className=" font-source_sans_3 text-xs text-neutral-600">{word.translation.text}</p>
      </div>
    </div>
  );
};

export default Word;
