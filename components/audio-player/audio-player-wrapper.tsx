'use client';

import useQuranReader from '@/stores/quran-reader-state';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import AudioPlayerSkeleton from '../skeleton-loaders/audio-player-skeleton';
import useReciterStore from '@/stores/reciter-store';
import { AudioFile } from '@/lib/types/audio';
import { fetcher } from '@/services/api';

const AudioPlayer = dynamic(() => import('./audio-player'), {
  ssr: false,
  loading: () => <AudioPlayerSkeleton />,
});

const AudioPlayerWrapper = () => {
  const { reciterId } = useReciterStore();
  const {
    showAudioPlayer,
    setShowAudioPlayer,
    setAudioId,
    audioId,
    setAudioData,
    setAudioUrl,
    setHighlightedVerse,
    setAudioPlaying,
    setCurrentVerse,
  } = useQuranReader();
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  useEffect(() => {
    const fetchAudioData = async () => {
      if (!audioId) return;

      setIsLoading(true);

      try {
        const url = `/quran/audios/${reciterId}/?chapter=${audioId}`;
        const response = await fetcher<AudioFile>(url);

        if (response && audioId) {
          setAudioData(response);
          setAudioUrl(
            `${process.env.NEXT_PUBLIC_AUDIO_URL}/${response.path}/${audioId.toString().padStart(3, '0')}.mp3`
          );
        }
      } catch (err) {
        console.error('Error fetching audio data:', err);
        setError(true);
        setAudioData(null);
        setAudioUrl('');
      } finally {
        setIsLoading(false);
      }
    };

    if (audioId) {
      fetchAudioData();
    }
  }, [audioId, reciterId]);

  const handleClose = () => {
    setShowAudioPlayer(false);
    setAudioId(null);
    setAudioUrl('');
    setAudioData(null);
    setHighlightedVerse(null);
    setAudioPlaying(false);
    setCurrentVerse(null);
  };

  if (!showAudioPlayer) {
    return null;
  }

  if (error) {
    handleClose();
    return null;
  }

  return (
    <div className="m-4 md:m-6">
      {isLoading ? <AudioPlayerSkeleton /> : <AudioPlayer onClose={handleClose} />}
    </div>
  );
};

export default AudioPlayerWrapper;
