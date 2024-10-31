import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { RECITERS_LIST } from '@/data/reciters-info';
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

const AudioRecitersSelection = () => {
  const { reciterId, setReciterId } = useReciterStore();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-max min-w-52 justify-between rounded-full px-3 py-1 text-xs"
        >
          {reciterId
            ? RECITERS_LIST.find(reciter => reciter.id.toString() === reciterId)?.translated_name
                .name
            : 'Select Reciter...'}
          <ChevronsUpDown className="ml-1 h-3 w-3 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Reciter..." />
          <CommandList>
            <CommandEmpty>No Reciter found.</CommandEmpty>
            <CommandGroup>
              {RECITERS_LIST.map(reciter => (
                <CommandItem
                  key={reciter.id}
                  value={reciter.translated_name.name}
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
                  {reciter.translated_name.name}
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
