import { GraduationHatIcon } from '@/icons';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { MergedVerse } from '@/lib/types/verses-type';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { formatVerseNumber } from '@/lib/utils/verse-utils';
import { ScrollArea } from '../ui/scroll-area';

type TafsirModalProps = {
  surahId?: string;
  verseKey: string;
  verse: MergedVerse;
};
const TafsirModal = ({ surahId, verseKey, verse }: TafsirModalProps) => {
  const surah = SURAH_EN.find(s => s.id === Number(surahId));
  const surahName = surah ? surah.transliteration : 'Unknown Surah';
  const verseNumber = formatVerseNumber(verseKey.split(':')[1]);

  const title = `${surahName}${verseNumber ? ` : ${verseNumber}` : ''}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-max w-max rounded-lg p-0.5">
          <GraduationHatIcon className="text-2xl hover:cursor-pointer" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90vh] w-full max-w-[95vw] sm:max-w-[80vw] lg:max-w-[1000px]">
        <DialogHeader className="space-y-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-100px)] w-full rounded-md border p-4 sm:p-6">
          <div className="space-y-6 text-base sm:text-lg">
            <p className="font-arabic text-right text-4xl sm:text-5xl lg:text-6xl" dir="rtl">
              مَالِكِ يَوْمِ الدِّينِ
            </p>
            <p className="text-muted-foreground text-xl sm:text-2xl">Maaliki yawmid deen</p>
            <h3 className="text-xl font-semibold sm:text-2xl">English - Saheeh International</h3>
            <p className="text-lg sm:text-xl">Sovereign of the Day of Recompense.</p>
            <h3 className="text-xl font-semibold sm:text-2xl">English - Tafsir Ibn Kathir</h3>
            <p className="text-lg sm:text-xl">Indicating Sovereignty on the Day of Judgment</p>
            <p>
              Allah mentioned His sovereignty of the Day of Resurrection, but this does not negate
              His sovereignty over all other things. For Allah mentioned that He is the Lord of
              existence, including this earthly life and the Hereafter. Allah only mentioned the Day
              of Recompense here because on that Day, no one except Him will be able to claim
              ownership of anything whatsoever. On that Day, no one will be allowed to speak without
              His permission. Similarly, Allah said,
            </p>
            <p>
              (The Day that Ar-Ruh [Jibril (Gabriel) or another angel] and the angels will stand
              forth in rows, they will not speak except him whom the Most Gracious (Allah) allows,
              and he will speak what is right.) (78:38),
            </p>
            <p>
              (And all voices will be humbled for the Most Gracious (Allah), and nothing shall you
              hear but the low voice of their footsteps.)(20:108), and,
            </p>
            <p>
              (On the Day when it comes, no person shall speak except by His (Allah's) leave. Some
              among them will be wretched and (others) blessed) (11:105).
            </p>
            <p>
              Ad-Dahhak said that Ibn `Abbas commented, "Allah says, `On that Day, no one owns
              anything that they used to own in the world.'"
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TafsirModal;
