'use client';

import useQuranReader from '@/stores/quran-reader-state';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import AudioPlayerSkeleton from '../skeleton-loaders/audio-player-skeleton';
import useReciterStore from '@/stores/reciter-store';
import useSWR from 'swr';
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
  } = useQuranReader();

  const { data, error, isLoading } = useSWR<AudioFile>(
    audioId ? `/quran/audios/${reciterId}/?chapter=${audioId}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnFocus: false,
    }
  );

  // Handle data updates using useEffect instead of onSuccess
  useEffect(() => {
    if (data && audioId) {
      setAudioData(data);
      setAudioUrl(`${data.path}/${audioId.toString().padStart(3, '0')}.mp3`);
    }
  }, [data, setAudioData, setAudioUrl]);

  // Handle errors using useEffect
  useEffect(() => {
    if (error) {
      console.error('Error fetching audio data:', error);
      setAudioData(null);
      setAudioUrl('');
    }
  }, [error, setAudioData, setAudioUrl]);

  const handleClose = () => {
    setShowAudioPlayer(false);
    setAudioId(null);
    setAudioUrl('');
    setAudioData(null);
    setHighlightedVerse(null);
    setAudioPlaying(false);
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
      <AudioPlayerSkeleton />
    </div>
  );
};

export default AudioPlayerWrapper;
