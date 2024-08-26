'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { SettingsIcon } from '@/icons';
import ResourceSelection from './resource-selection';

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
        <div className=" h-full w-full overflow-y-scroll">
          <ResourceSelection />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Settings;
