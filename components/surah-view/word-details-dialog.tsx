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
        <Button variant="ghost" className="h-max w-max px-0.5 py-1 md:px-2 md:py-2.5">
          <Word word={word} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] gap-4 rounded-3xl p-4 sm:rounded-4xl md:w-96 md:gap-6 md:p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold md:text-2xl">
            Word Details
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <div
            style={{ fontFamily: `var(--font-${arabicFont})` }}
            className={`text-center text-3xl md:text-5xl`}
          >
            {text_uthmani}
          </div>

          <div className="text-lg font-medium md:text-xl">{translation}</div>

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
