import { Verse } from '@/lib/types/verses-type';

type VerseDisplayProps = {
  verse: Verse;
};

const VerseDisplayCard = ({ verse }: VerseDisplayProps) => {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral p-6">
      <p>{verse.verse_number}</p>
      <p className="text-right font-lateef text-2xl">{verse.text_uthmani}</p>
    </div>
  );
};

export default VerseDisplayCard;
