'use client';
import { CrossIcon } from '@/icons';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { Button } from '../ui/button';
import AudioProgress from './audio-progress';
import AudioControls from './audio-controls';
import useQuranReader from '@/stores/quran-reader-state';
import { SURAH_EN } from '@/data/quran-meta/surahs/en';
import AudioRecitersSelection from './audio-reciters-selection';
import { formatVerseNumber } from '@/lib/utils/verse-utils';

type AudioPlayerProps = {
  onClose: () => void;
};

const AudioPlayer = ({ onClose }: AudioPlayerProps) => {
  const { audioUrl, highlightedVerse, audioId } = useQuranReader();
  const {
    isPlaying,
    currentTime,
    duration,
    buffered,
    isLoading,
    audioRef,
    togglePlayPause,
    handleSeek,
    skipTime,
    stopAudio,
  } = useAudioPlayer();

  const surah = SURAH_EN.find(s => s.id === audioId);
  const surahName = surah ? surah.transliteration : 'Unknown Surah';
  const verseNumber = highlightedVerse ? formatVerseNumber(highlightedVerse.split(':')[1]) : '';

  const audioTitle = `${surahName}${verseNumber ? ` : ${verseNumber}` : ''}`;

  return (
    <div className="relative w-full space-y-4 rounded-xl border border-neutral-300 bg-neutral p-4 shadow md:w-96 md:space-y-6">
      <div className="flex justify-between">
        <div>
          <h1 id="audio-title" className="font-semibold">
            {audioTitle}
          </h1>
          <div className="flex w-full items-center justify-start gap-1">
            <p className="text-xs text-neutral-600">Audio Playing :</p>
            <AudioRecitersSelection />
          </div>
        </div>
        <Button
          variant="ghost"
          className="absolute right-2 top-2 h-max w-max p-0"
          onClick={onClose}
        >
          <CrossIcon className="text-2xl" />
        </Button>
      </div>
      <AudioProgress
        currentTime={currentTime}
        duration={duration}
        buffered={buffered}
        onSeek={handleSeek}
      />
      <AudioControls
        isPlaying={isPlaying}
        isLoading={isLoading}
        onTogglePlayPause={togglePlayPause}
        onSkipBackward={() => skipTime(-10)}
        onSkipForward={() => skipTime(10)}
        currentTime={currentTime}
        duration={duration}
        onStop={stopAudio}
      />
      <audio ref={audioRef} src={audioUrl} preload="metadata" style={{ display: 'none' }} />
    </div>
  );
};

export default AudioPlayer;
