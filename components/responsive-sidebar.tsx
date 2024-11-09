'use client';

import React from 'react';
import { NavItems } from './nav-items';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Separator } from './ui/separator';
import { MenuIcon } from '@/icons';

const ResponsiveSidebar = () => {
  const [open, setOpen] = React.useState(false);
  const onItemClick = () => {
    setOpen(false);
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <MenuIcon class="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[272px]">
        <SheetHeader>
          <SheetTitle className="px-6 text-start">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <Separator />
          <NavItems onItemClick={onItemClick} />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResponsiveSidebar;