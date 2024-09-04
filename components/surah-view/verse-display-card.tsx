import { Verse } from '@/lib/types/verses-type';
import type { Word as WordType } from '@/lib/types/wbw-types';
import Word from './word';
type VerseDisplayProps = {
  verse: Verse & { words: WordType[] };
};

const VerseDisplayCard = ({ verse }: VerseDisplayProps) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral p-6">
      <p>{verse.verse_number}</p>
      <div className="text-right font-lateef" dir="rtl">
        <div className="inline leading-[100px]">
          {verse.words.map(
            word => !(word.position === verse.words.length) && <Word key={word.id} word={word} />
          )}
        </div>
      </div>
    </div>
  );
};
export default VerseDisplayCard;
