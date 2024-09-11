import { DetailsHorizontalIcon, GraduationHatIcon } from '@/icons';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import VerseAudioPlayButton from './verse-audio-play-button';

const VerseDisplayOptions = ({ surahId }: { surahId?: string }) => {
  return (
    <div className="flex items-center space-x-4 text-2xl text-neutral-600">
      <VerseAudioPlayButton surahId={surahId} />
      <GraduationHatIcon className="hover:cursor-pointer" />
      <VerseDisplayMoreOptions />
    </div>
  );
};

export default VerseDisplayOptions;

// TODO: add functionality for more options
const VerseDisplayMoreOptions = () => {
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
        <DropdownMenuItem>Copy Text</DropdownMenuItem>
        <DropdownMenuItem>Copy Link</DropdownMenuItem>
        <DropdownMenuItem>Share</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
