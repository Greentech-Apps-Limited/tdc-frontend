import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { QuranWord } from '@/lib/types/verses-type';
import Word from './word';
import { Button } from '../ui/button';
import { useSettings } from '@/contexts/settings-provider';

const WordDetailsDialog = ({ word }: { word: QuranWord }) => {
  const { arabicFont } = useSettings();
  const { text_uthmani, translation, root, lemma } = word;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-max w-max px-2 py-2.5">
          <Word word={word} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-96 gap-6 p-6 sm:rounded-4xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">Word Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div
            style={{ fontFamily: `var(--font-${arabicFont})` }}
            className={`text-center text-5xl`}
          >
            {text_uthmani}
          </div>

          <div className="text-2xl font-bold">{translation}</div>

          <div className="mt-2 flex w-full  gap-6">
            {lemma && (
              <div className="w-full rounded-lg bg-neutral-50 p-2">
                <div className="text-xs text-neutral-500">Lemma</div>
                <div style={{ fontFamily: `var(--font-${arabicFont})` }} className={`text-2xl`}>
                  {lemma}
                </div>
              </div>
            )}
            {root && (
              <div className="w-full rounded-lg bg-neutral-50 p-2">
                <div className="text-xs text-neutral-500">Root</div>
                <div style={{ fontFamily: `var(--font-${arabicFont})` }} className={`text-2xl`}>
                  {root}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WordDetailsDialog;
