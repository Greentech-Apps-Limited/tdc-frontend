'use client';

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command';
import { cn } from '@/lib/utils/common-utils';
import useReciterStore from '@/stores/reciter-store';
import { useState } from 'react';
import useSWRImmutable from 'swr/immutable';
import { fetcher } from '@/services/api';
import { Skeleton } from '../ui/skeleton';
import { RecitersResponse } from '@/lib/types/audio';

const AudioRecitersSelection = () => {
  const { reciterId, setReciterId } = useReciterStore();
  const [open, setOpen] = useState(false);

  const { data, error, isLoading } = useSWRImmutable<RecitersResponse>(
    '/quran/audios/?limit=500',
    fetcher
  );

  if (error) {
    return (
      <Button variant="outline" className="h-max rounded-full px-3 py-1 text-xs">
        Failed to load reciters
      </Button>
    );
  }

  if (isLoading) {
    return <Skeleton className="h-8 w-52 rounded-full" />;
  }

  const selectedReciter = data?.results.find(reciter => reciter.id.toString() === reciterId);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-max min-w-52 justify-between rounded-full px-3 py-1 text-xs"
        >
          {selectedReciter ? selectedReciter.qari_name : 'Select Reciter...'}
          <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Reciter..." />
          <CommandList>
            <CommandEmpty>No Reciter found.</CommandEmpty>
            <CommandGroup>
              {data?.results.map(reciter => (
                <CommandItem
                  key={reciter.id}
                  value={reciter.qari_name}
                  onSelect={() => {
                    setReciterId(reciter.id.toString());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      reciterId === reciter.id.toString() ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {reciter.qari_name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AudioRecitersSelection;
