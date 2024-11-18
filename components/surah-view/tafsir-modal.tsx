import React from 'react';
import DOMPurify from 'dompurify';
import { GraduationHatIcon } from '@/icons';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MergedVerse } from '@/lib/types/verses-type';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { formatVerseNumber, getSurahAyahFromId } from '@/lib/utils/verse-utils';
import { ScrollArea } from '../ui/scroll-area';
import useDedupedFetchVerse from '@/hooks/use-deduped-fetch-verse';
import { useParams } from 'next/navigation';
import { QuranSegment } from '@/lib/types/quran-segment-type';
import { useSettings } from '@/contexts/settings-provider';
import TafsirSkeleton from '../skeleton-loaders/tafseer-skeleton';
import { useTranslations } from 'next-intl';
import { useVerseContext } from '@/contexts/verse-provider';

type TafsirModalProps = {
  surahId?: string;
  verseKey: string;
  setApiPageToVersesMap: React.Dispatch<React.SetStateAction<Record<number, MergedVerse[]>>>;
};
const containsArabic = (text: string) => {
  const arabicCharCount = (text.match(/[\u0600-\u06FF]/g) || []).length;
  const totalLength = text.trim().length;

  return arabicCharCount > 0 && arabicCharCount / totalLength > 0.2;
};

const isParenthesizedTranslation = (text: string) => {
  return /^\s*\([^)]+\)\s*$/.test(text) && !containsArabic(text);
};

const addLTRFormattingToBrackets = (text: string) => text.replace(/﴾(.*?)﴿/g, '\u202A﴾$1﴿\u202C');

const FormattedText = ({ text }: { text: string }) => {
  const { arabicFont } = useSettings();

  const sanitizedContent = DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [
      'span',
      'br',
      'h2',
      'h3',
      'b',
      'p',
      'div',
      'strong',
      'em',
      'i',
      'u',
      'ul',
      'ol',
      'li',
      'table',
      'tr',
      'td',
      'th',
      'thead',
      'tbody',
      'img',
      'a',
      'code',
      'pre',
      'blockquote',
      'hr',
      'h1',
      'h4',
      'h5',
      'h6',
    ],
    ALLOWED_ATTR: ['class', 'alt', 'rel', 'style'],
  });

  const formattedContent = sanitizedContent.split('\n').map((line, index) => {
    const trimmedLine = line.trim();

    if (!trimmedLine) return null;

    const hasHtmlTags = /<\/?[a-z][\s\S]*>/i.test(trimmedLine);
    if (hasHtmlTags) {
      return <div key={index} dangerouslySetInnerHTML={{ __html: trimmedLine }} />;
    }

    // Skip Arabic formatting for parenthesized translations
    if (isParenthesizedTranslation(trimmedLine)) {
      return <p key={index}>{trimmedLine}</p>;
    }

    if (containsArabic(trimmedLine)) {
      const formattedArabicText = addLTRFormattingToBrackets(trimmedLine);
      return (
        <p
          key={index}
          className="arabic-text text-2xl leading-[50px]"
          dir="rtl"
          style={{ fontFamily: `var(--font-${arabicFont})` }}
        >
          {formattedArabicText}
        </p>
      );
    }

    return <p key={index}>{trimmedLine}</p>;
  });

  return <>{formattedContent}</>;
};

const TafsirModal = ({ surahId, verseKey, setApiPageToVersesMap }: TafsirModalProps) => {
  const { arabicFont } = useSettings();
  const t = useTranslations('tafseer');
  const { quranSegment, segmentId } = useParams<{ quranSegment: string; segmentId: string }>();
  const { initialVerses, translationIds, translationInfos, wbwTr, tafseerIds, verseLookup } =
    useVerseContext();
  const [isOpen, setIsOpen] = React.useState(false);
  const [currentVerseIndex, setCurrentVerseIndex] = React.useState(0);

  React.useEffect(() => {
    const index = verseLookup.findIndex(key => key === verseKey);
    setCurrentVerseIndex(index);
  }, [verseKey, isOpen, verseLookup]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  // Fetch verse data for the current index
  const { verse: currentVerse, isLoading } = useDedupedFetchVerse({
    verseIdx: currentVerseIndex,
    segmentType: quranSegment as QuranSegment,
    segmentNumber: segmentId,
    translationIds,
    translationInfos,
    initialVerses,
    setApiPageToVersesMap,
    wbwTr,
    tafseerIds,
  });

  const handleNavigate = (direction: 'prev' | 'next') => {
    const newIndex = direction === 'next' ? currentVerseIndex + 1 : currentVerseIndex - 1;
    if (newIndex >= 0 && newIndex < verseLookup.length) {
      setCurrentVerseIndex(newIndex);
    }
  };

  const handleReferenceClick = (surah: number, ayah: number) => {
    const newVerseKey = `${surah}:${ayah}`;
    const newIndex = verseLookup.findIndex(key => key === newVerseKey);
    if (newIndex !== -1) {
      setCurrentVerseIndex(newIndex);
    }
  };

  const surah = SURAH_EN.find(s => s.id === Number(surahId));
  const verseNumber = formatVerseNumber(verseLookup[currentVerseIndex]?.split(':')[1]);
  const title = `${surah?.transliteration || 'Unknown Surah'}${verseNumber ? ` : ${verseNumber}` : ''}`;

  const formatReferenceMessage = (verseId: number) => {
    const { surah, ayah } = getSurahAyahFromId(verseId);
    const referencedSurah = SURAH_EN.find(s => s.id === surah);
    return {
      text: t('reference', {
        ayah,
        surah: referencedSurah?.transliteration || surah,
      }),
      surah,
      ayah,
    };
  };

  const isNumericString = (text: string) => {
    return !isNaN(Number(text)) && !isNaN(parseFloat(text));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-lg p-0">
          <GraduationHatIcon className="text-lg hover:cursor-pointer md:text-2xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-full max-h-[90vh] w-full max-w-[95vw] rounded-lg p-3 sm:max-w-[80vw] md:rounded-3xl md:p-6 lg:max-w-[1000px]">
        <DialogHeader className="space-y-4 md:space-y-6">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(85vh-100px)] w-full rounded-md  p-4 pb-0 sm:p-6 sm:pb-0">
          {isLoading ? (
            <TafsirSkeleton />
          ) : (
            <div className=" space-y-6">
              {currentVerse?.text_uthmani && (
                <p
                  className="font-arabic text-right text-xl sm:text-5xl lg:text-2xl"
                  dir="rtl"
                  style={{ fontFamily: `var(--font-${arabicFont})` }}
                >
                  {currentVerse.text_uthmani}
                </p>
              )}
              <div className="space-y-6">
                {currentVerse?.combinedTafseer?.map(tafseer => {
                  return (
                    <div key={tafseer.info?.author_name} className="space-y-3">
                      <p className="text-xs text-neutral-500">{tafseer.info?.name}</p>
                      <div className="space-y-4">
                        {isNumericString(tafseer.text) ? (
                          (() => {
                            const reference = formatReferenceMessage(Number(tafseer.text));
                            return (
                              <button
                                onClick={() =>
                                  handleReferenceClick(reference.surah, reference.ayah)
                                }
                                className="text-primary w-full cursor-pointer text-left italic underline hover:underline"
                              >
                                {reference.text}
                              </button>
                            );
                          })()
                        ) : (
                          <FormattedText text={tafseer.text} />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </ScrollArea>
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => handleNavigate('prev')}
            disabled={currentVerseIndex <= 0}
            className="rounded-full px-3 py-2 text-sm"
          >
            Previous Ayah
          </Button>
          <Button
            variant="outline"
            onClick={() => handleNavigate('next')}
            disabled={currentVerseIndex >= verseLookup.length - 1}
            className="rounded-full px-3 py-2 text-sm"
          >
            Next Ayah
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default TafsirModal;
