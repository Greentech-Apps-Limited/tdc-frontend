import {
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { MergedVerse } from '@/lib/types/verses-type';
import {
  FacebookIcon,
  LinkedinIcon,
  LinkIcon3,
  MessageEmailIcon,
  TelegramIcon,
  WhatsappIcon,
  XIcon,
} from '@/icons';

interface ShareMenuProps {
  verseKey: string;
  verse: MergedVerse;
  formatVerseLink: (verseKey: string) => string;
  formatVerseText: (verse: MergedVerse) => string;
}

const ShareMenu = ({ verseKey, verse, formatVerseLink, formatVerseText }: ShareMenuProps) => {
  const { toast } = useToast();
  const link = formatVerseLink(verseKey);
  const text = formatVerseText(verse);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast({
        title: 'Success',
        description: 'Link copied to clipboard',
        variant: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to copy link : ${error}`,
        variant: 'destructive',
      });
    }
  };

  const shareViaMedia = (platform: string) => {
    const shareData: { [key: string]: string } = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      twitter: `https://x.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
      telegram: `https://telegram.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${text}\n${link}`)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(link)}`,
      email: `mailto:?subject=Shared Verse&body=${encodeURIComponent(`${text}\n\n${link}`)}`,
    };

    const url = shareData[platform.toLowerCase()];
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="flex items-center font-semibold text-neutral-700">
        Share
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="w-48">
        <DropdownMenuItem onClick={handleCopyLink} className="flex items-center">
          <LinkIcon3 className="mr-2 h-6 w-6" />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => shareViaMedia('facebook')} className="flex items-center">
          <FacebookIcon className="mr-2 h-6 w-6" />
          Facebook
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('twitter')} className="flex items-center">
          <XIcon className="mr-2 h-6 w-6" />
          Twitter
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('telegram')} className="flex items-center">
          <TelegramIcon className="mr-2 h-6 w-6" />
          Telegram
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('whatsapp')} className="flex items-center">
          <WhatsappIcon className="mr-2 h-6 w-6" />
          WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('linkedin')} className="flex items-center">
          <LinkedinIcon className="mr-2 h-6 w-6" />
          LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => shareViaMedia('email')} className="flex items-center">
          <MessageEmailIcon className="mr-2 h-6 w-6" />
          Email
        </DropdownMenuItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};

export default ShareMenu;
