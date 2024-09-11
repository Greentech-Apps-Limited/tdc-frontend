import useQuranReader from '@/stores/quran-reader-state';
import React from 'react';
import { Button } from '../ui/button';
import { PlayCircleIcon } from 'lucide-react';

interface VerseAudioPlayButtonProps {
  surahId?: string;
}

const VerseAudioPlayButton = ({ surahId }: VerseAudioPlayButtonProps) => {
  const { setAudioId } = useQuranReader();

  const handleClick = () => {
    if (surahId) {
      const numericSurahId = parseInt(surahId, 10);
      setAudioId(numericSurahId);
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="h-max w-max rounded-lg p-0.5"
      aria-label="verse audio play"
    >
      <PlayCircleIcon className="hover:cursor-pointer" />
    </Button>
  );
};

export default VerseAudioPlayButton;
