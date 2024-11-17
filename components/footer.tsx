'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { LinkIcon2 } from '@/icons';
import GtalLogo from '@/public/logos/gtal.svg';

const Footer = () => {
  const t = useTranslations('Footer');

  return (
    <div className="m-auto my-10 flex w-72 flex-col items-center justify-center gap-4 text-center">
      <GtalLogo className="h-[30px] w-[118px]" aria-label="Greentech Apps Limited" />
      <p>{t('description')}</p>
      <Button asChild variant="outline" className="gap-2 rounded-full">
        <a
          href="https://greentechapps.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit Greentech Apps Limited website"
        >
          Visit Greentech <LinkIcon2 className="h-4 w-4" />
        </a>
      </Button>
    </div>
  );
};

export default Footer;
