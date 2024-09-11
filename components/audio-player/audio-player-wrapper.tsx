'use client';

import useQuranReader from '@/stores/quran-reader-state';
import React, { useEffect } from 'react';
import AudioPlayer from './audio-player';
import { useParams } from 'next/navigation';

const AudioPlayerWrapper = () => {
  const params = useParams();
  const {
    showAudioPlayer,
    setShowAudioPlayer,
    setAudioId,
    audioId,
    setAudioData,
    setAudioUrl,
    autoScroll,
    highlightedVerse,
    highlightedWord,
  } = useQuranReader();

  useEffect(() => {
    if (audioId) {
      fetch(`https://api.quran.com/api/v4/chapter_recitations/7/${audioId}?segments=true`)
        .then(res => res.json())
        .then(data => {
          setAudioData(data.audio_file);
          setAudioUrl(data.audio_file.audio_url);
        })
        .catch(error => {
          console.error('Error fetching audio data:', error);
          setAudioData(null);
        });
    } else {
      setAudioData(null);
    }
  }, [audioId, setAudioUrl, setAudioData]);

  const handleClose = () => {
    setShowAudioPlayer(false);
    setAudioId(null);
  };

  useEffect(() => {
    if (parseInt(params?.segmentId as string) === audioId) {
      const highlightedElement = document.querySelector(
        `[data-verse="${highlightedVerse}"]`
      ) as HTMLElement;
      if (!highlightedElement) return;
      highlightedElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    }
  }, [highlightedVerse, params?.segmentId, audioId]);

  useEffect(() => {
    if (parseInt(params?.chapterId as string) !== audioId || autoScroll !== 'word') return;
    const highlightedElement = document.querySelector(
      `[data-word="${highlightedWord}"]`
    ) as HTMLElement;
    if (!highlightedElement) return;
    highlightedElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, [highlightedWord, params?.chapterId, audioId, autoScroll]);

  if (!showAudioPlayer) {
    return null;
  }

  return <AudioPlayer onClose={handleClose} />;
};

export default AudioPlayerWrapper;
