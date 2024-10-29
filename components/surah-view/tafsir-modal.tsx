import React from 'react';
import DOMPurify from 'dompurify';
import { GraduationHatIcon } from '@/icons';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { MergedVerse } from '@/lib/types/verses-type';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import { formatVerseNumber } from '@/lib/utils/verse-utils';
import { ScrollArea } from '../ui/scroll-area';

type TafsirModalProps = {
  surahId?: string;
  verseKey: string;
  verse: MergedVerse;
};

type ContentDisplayProps = {
  content: string;
};

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const processContent = (text: string) => {
    // First preserve HTML tags
    const preservedTags: string[] = [];
    let processedContent = text.replace(/<[^>]+>/g, match => {
      preservedTags.push(match);
      return `###HTML${preservedTags.length - 1}###`;
    });

    // Process double newlines to find text blocks
    processedContent = processedContent.replace(/\n\n([^]*?)(?=\n\n|$)/g, (match, textBlock) => {
      if (!textBlock.trim()) return '';

      // Improved Arabic text detection - requires substantial Arabic content
      const arabicCharCount = (textBlock.match(/[\u0600-\u06FF]/g) || []).length;
      const totalLength = textBlock.trim().length;
      const isArabic = arabicCharCount > 10 || arabicCharCount / totalLength > 0.3;

      return `\n\n<span class="${isArabic ? 'arabic-text' : 'non-arabic-text'}">${textBlock}</span>\n\n`;
    });

    // Replace single newlines not between blocks with br
    processedContent = processedContent.replace(/(?<!\n)\n(?!\n)/g, '<br />');

    // Restore HTML tags
    processedContent = processedContent.replace(/###HTML(\d+)###/g, (_, index) => {
      return preservedTags[parseInt(index)] || '';
    });

    return processedContent.trim();
  };

  const formattedContent = processContent(content);

  const sanitizedContent = DOMPurify.sanitize(formattedContent, {
    ALLOWED_TAGS: ['span', 'br', 'h2', 'h3', 'b'],
    ALLOWED_ATTR: ['class'],
  });

  return <div className="content-display" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
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
          <div className="space-y-6">
            {verse.text_uthmani && (
              <p className="font-arabic text-right text-xl sm:text-5xl lg:text-2xl" dir="rtl">
                {verse.text_uthmani}
              </p>
            )}
            <div>
              {verse.combinedTafseer?.map((tafseer, index) => {
                return (
                  <>
                    <p className="text-xs text-neutral-500">{tafseer.info?.author_name}</p>
                    <ContentDisplay key={index} content={tafseer.text} />
                  </>
                );
              })}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TafsirModal;
