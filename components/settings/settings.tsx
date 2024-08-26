'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { SettingsIcon } from '@/icons';
import ResourceSelection from './resource-selection';
import ContentSettings from './content-settings';

const Settings = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <SettingsIcon className="text-2xl hover:cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
        </SheetHeader>
        <div className="h-full w-full space-y-6 overflow-y-scroll py-6">
          <ContentSettings />
          <ResourceSelection />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
