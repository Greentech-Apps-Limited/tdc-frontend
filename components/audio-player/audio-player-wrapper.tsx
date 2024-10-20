'use client';

import useQuranReader from '@/stores/quran-reader-state';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AudioPlayerSkeleton from '../skeleton-loaders/audio-player-skeleton';
import { scrollToElement } from '@/lib/utils/common-utils';
import useReciterStore from '@/stores/reciter-store';

const AudioPlayer = dynamic(() => import('./audio-player'), {
  ssr: false,
  loading: () => <AudioPlayerSkeleton />,
});

const AudioPlayerWrapper = () => {
  const { reciterId } = useReciterStore();
  const [isLoading, setLoading] = useState(true);
  const {
    showAudioPlayer,
    setShowAudioPlayer,
    setAudioId,
    audioId,
    setAudioData,
    setAudioUrl,
    highlightedVerse,
    autoScroll,
    setHighlightedVerse,
  } = useQuranReader();

  useEffect(() => {
    const fetchAudioData = async () => {
      if (!audioId) {
        setAudioData(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(
          `https://api.quran.com/api/v4/chapter_recitations/${reciterId}/${audioId}?segments=true`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAudioData(data.audio_file);
        setAudioUrl(data.audio_file.audio_url);
      } catch (error) {
        console.error('Error fetching audio data:', error);
        setAudioData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAudioData();
  }, [audioId, setAudioUrl, setAudioData, reciterId]);

  const handleClose = () => {
    setShowAudioPlayer(false);
    setAudioId(null);
    setAudioUrl('');
    setAudioData(null);
    setHighlightedVerse(null);
  };

  useEffect(() => {
    if (highlightedVerse && showAudioPlayer && autoScroll === 'verse') {
      const scrollContainer = document.getElementById('scroll-container');
      const highlightedElement = document.querySelector(
        `[data-verse="${highlightedVerse}"]`
      ) as HTMLElement;

      if (scrollContainer && highlightedElement) {
        scrollToElement({
          container: scrollContainer,
          element: highlightedElement,
          offset: 0.01,
        });
      }
    }
  }, [highlightedVerse, showAudioPlayer, autoScroll]);

  if (!showAudioPlayer) {
    return null;
  }

  return (
    <div className="m-6">
      {isLoading ? <AudioPlayerSkeleton /> : <AudioPlayer onClose={handleClose} />}
    </div>
  );
};

export default AudioPlayerWrapper;
