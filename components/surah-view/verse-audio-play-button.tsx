import useQuranReader from '@/stores/quran-reader-state';
import React from 'react';
import { Button } from '../ui/button';
import { PlayCircleIcon } from '@/icons';
import { useAudioPlayer } from '@/hooks/use-audio-player';

interface VerseAudioPlayButtonProps {
  surahId?: string;
  verseKey?: string;
}

const VerseAudioPlayButton = ({ surahId, verseKey }: VerseAudioPlayButtonProps) => {
  const { setAudioId, setCurrentVerse } = useQuranReader();
  const { play, isPlaying } = useAudioPlayer();

  const handleClick = () => {
    if (surahId) {
      const numericSurahId = parseInt(surahId, 10);
      setAudioId(numericSurahId);
    }
    if (verseKey) {
      setCurrentVerse(verseKey);
    }
    if (!isPlaying) {
      play();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant="ghost"
      className="h-max w-max rounded-lg p-0.5"
      aria-label="verse audio play"
    >
      <PlayCircleIcon className="text-2xl hover:cursor-pointer" />
    </Button>
  );
};

export default VerseAudioPlayButton;
