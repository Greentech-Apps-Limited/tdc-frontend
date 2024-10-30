import { DetailsHorizontalIcon } from '@/icons';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import VerseAudioPlayButton from './verse-audio-play-button';
import TafsirModal from './tafsir-modal';
import { MergedVerse } from '@/lib/types/verses-type';
import useSettingsStore from '@/stores/settings-store';
import { useToast } from '@/hooks/use-toast';
import { APP_BASE_URL } from '@/services/api';

interface VerseDisplayOptionsProps {
  surahId?: string;
  verseKey: string;
  verse: MergedVerse;
}

const VerseDisplayOptions = ({ surahId, verseKey, verse }: VerseDisplayOptionsProps) => {
  return (
    <div className="flex items-center space-x-4 text-2xl text-neutral-600">
      <VerseAudioPlayButton surahId={surahId} verseKey={verseKey} />
      <TafsirModal verse={verse} surahId={surahId} verseKey={verseKey} />
      <VerseDisplayMoreOptions verse={verse} verseKey={verseKey} />
    </div>
  );
};

export default VerseDisplayOptions;

const VerseDisplayMoreOptions = ({ verse, verseKey }: { verse: MergedVerse; verseKey: string }) => {
  const { toast } = useToast();
  const { selectedTranslation } = useSettingsStore();

  const formatVerseText = (verse: MergedVerse) => {
    const lines = [
      verse.text_uthmani,
      '',
      ...(verse.combinedTranslations?.map(
        translation => `[${translation.info?.name}]\n${translation.text}`
      ) || []),
      '',
      `Al-Quran: ${verseKey}`,
      `Source: ${formatVerseLink(verseKey)}`,
    ];

    return lines.join('\n');
  };

  const formatVerseLink = (verseKey: string) => {
    const [surahId, verseNumber] = verseKey.split(':');
    const translationsQuery = selectedTranslation.join('-');
    return `${APP_BASE_URL}/${surahId}/${verseNumber}?translations=${translationsQuery}`;
  };

  const handleCopyText = async () => {
    try {
      const formattedText = formatVerseText(verse);
      await navigator.clipboard.writeText(formattedText);
      toast({
        title: 'Success',
        description: 'Verse text copied to clipboard',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to copy verse text: ${error}`,
        variant: 'destructive',
      });
    }
  };

  const handleCopyLink = async () => {
    try {
      const link = formatVerseLink(verseKey);
      await navigator.clipboard.writeText(link);
      toast({
        title: 'Success',
        description: 'Link copied to clipboard',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to copy verse link: ${error}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="focus-visible:ring-offset-10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-400"
      >
        <Button variant="ghost" className="data-[state=open]:bg-muted flex h-8 w-8 p-0">
          <DetailsHorizontalIcon className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem onClick={handleCopyText}>Copy Text</DropdownMenuItem>
        <DropdownMenuItem onClick={handleCopyLink}>Copy Link</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
