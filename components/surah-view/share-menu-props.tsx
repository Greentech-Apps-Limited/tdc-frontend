import {
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { MergedVerse } from '@/lib/types/verses-type';
import {
  FacebookIcon,
  LinkedinIcon,
  MessageEmailIcon,
  ShareIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
} from '@/icons';

interface ShareMenuProps {
  verseKey: string;
  verse: MergedVerse;
  formatVerseLink: (verseKey: string) => string;
  formatVerseText: (verse: MergedVerse, includeSource: boolean) => string;
}

const ShareMenu = ({ verseKey, verse, formatVerseLink, formatVerseText }: ShareMenuProps) => {
  const link = formatVerseLink(verseKey);

  const shareViaMedia = (platform: string) => {
    const shareData: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      twitter: `https://x.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(formatVerseText(verse, false))}`,
      telegram: `https://telegram.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(formatVerseText(verse, false))}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${formatVerseText(verse, false)}\n\n${link}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
      email: `mailto:?subject=Shared Verse&body=${encodeURIComponent(`${formatVerseText(verse, false)}\n\n${link}`)}`,
    };

    const url = shareData[platform.toLowerCase()];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center font-semibold text-neutral-700">
        <ShareIcon className="mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6" />
        Share
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="md:w-48">
        <DropdownMenuItem onClick={() => shareViaMedia('facebook')} className="flex items-center">
          <FacebookIcon className="mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('twitter')} className="flex items-center">
          <XIcon className="mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('telegram')} className="flex items-center">
          <TelegramIcon className="mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6" />
          Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('whatsapp')} className="flex items-center">
          <WhatsappIcon className="mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('linkedin')} className="flex items-center">
          <LinkedinIcon className="mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('email')} className="flex items-center">
          <MessageEmailIcon className="mr-1 h-4 w-4 md:mr-2 md:h-6 md:w-6" />
          Email
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default ShareMenu;
