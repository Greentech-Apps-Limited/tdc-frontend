'use client';

import { useTranslations } from 'next-intl';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { SettingsIcon } from '@/icons';
import ResourceSelection from './resource-selection';
import ContentSettings from './content-settings';
import FontSettings from './font-settings';
import { TranslationItem } from '@/lib/types/surah-translation-type';

const Settings = ({ translationsInfo }: { translationsInfo: TranslationItem[] }) => {
  const t = useTranslations('Settings');

  return (
    <Sheet>
      <SheetTrigger>
        <SettingsIcon className="text-2xl hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{t('title')}</SheetTitle>
        </SheetHeader>
        <div className="h-full w-full space-y-6 overflow-y-scroll py-6 pb-16">
          <ContentSettings />
          <ResourceSelection translationsInfo={translationsInfo} />
          <FontSettings />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
