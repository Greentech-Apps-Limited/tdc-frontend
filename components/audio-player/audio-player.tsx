'use client';

import { CrossIcon } from '@/icons';
import { useAudioPlayer } from '@/hooks/use-audio-player';
import { Button } from '../ui/button';
import AudioProgress from './audio-progress';
import AudioControls from './audio-controls';
import useQuranReader from '@/stores/quran-reader-state';

interface AudioPlayerProps {
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ onClose }) => {
  const { audioUrl } = useQuranReader();
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
  } = useAudioPlayer(audioUrl);

  return (
    <div className="w-96 space-y-6 rounded-xl border border-neutral-300 bg-neutral p-4 shadow">
      <div className="flex justify-between">
        <div>
          <h1 id="audio-title" className="font-semibold">
            Audio Player
          </h1>
          <p className="text-xs  text-neutral-600">Now Playing: </p>
        </div>
        <Button variant="ghost" className="h-max w-max p-0" onClick={onClose}>
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
