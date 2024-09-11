import { useState, useRef, useEffect, useCallback } from 'react';
import useQuranReader from '@/stores/quran-reader-state';

export const useAudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState<Array<{ start: number; end: number }>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const audioRef = useRef<HTMLAudioElement>(null);

    const {
        audioUrl,
        audioId,
        showAudioPlayer,
        audioData,
        setHighlightedWord,
        setHighlightedVerse,
    } = useQuranReader();

    const play = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.play().then(() => {
            setIsPlaying(true);
        }).catch((error) => {
            console.error('Playback failed', error);
            setIsPlaying(false);
        });
    }, []);

    const pause = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        setIsPlaying(false);
    }, []);

    const togglePlayPause = useCallback(() => {
        if (isPlaying) {
            pause();
        } else {
            play();
        }
    }, [isPlaying, pause, play]);

    const stopAudio = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
        setCurrentTime(0);
    }, []);

    const handleSeek = useCallback((newTime: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }, []);

    const skipTime = useCallback(
        (seconds: number) => {
            const audio = audioRef.current;
            if (!audio) return;

            const newTime = Math.max(0, Math.min(audio.currentTime + seconds, duration));
            audio.currentTime = newTime;
        },
        [duration]
    );

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateBuffered = () => {
            const bufferedRanges: Array<{ start: number; end: number }> = [];
            for (let i = 0; i < audio.buffered.length; i++) {
                bufferedRanges.push({
                    start: audio.buffered.start(i),
                    end: audio.buffered.end(i),
                });
            }
            setBuffered(bufferedRanges);
        };

        const onTimeUpdate = () => {
            setCurrentTime(audio.currentTime);
            if (audioData && audioData.timestamps) {
                const activeVerse = audioData.timestamps.find(
                    (verse) => audio.currentTime < verse.timestamp_to / 1000
                );
                if (activeVerse) {
                    activeVerse.segments.forEach((segment) => {
                        const [word, startTime, endTime] = segment;
                        if (startTime !== undefined && endTime !== undefined) {
                            const segmentStartTime = startTime / 1000;
                            const segmentEndTime = endTime / 1000;
                            if (audio.currentTime >= segmentStartTime && audio.currentTime < segmentEndTime) {
                                setHighlightedWord(`${activeVerse.verse_key}:${word}`);
                            }
                        }
                    });
                    setHighlightedVerse(activeVerse.verse_key);
                } else {
                    setHighlightedVerse(null);
                }
            }
        };

        const onLoadedMetadata = () => {
            setDuration(audio.duration);
            setIsLoading(false);
        };
        const onProgress = updateBuffered;
        const onEnded = () => setIsPlaying(false);
        const onWaiting = () => setIsLoading(true);
        const onCanPlay = () => setIsLoading(false);

        audio.addEventListener('timeupdate', onTimeUpdate);
        audio.addEventListener('loadedmetadata', onLoadedMetadata);
        audio.addEventListener('progress', onProgress);
        audio.addEventListener('ended', onEnded);
        audio.addEventListener('waiting', onWaiting);
        audio.addEventListener('canplay', onCanPlay);

        audio.load();

        return () => {
            audio.removeEventListener('timeupdate', onTimeUpdate);
            audio.removeEventListener('loadedmetadata', onLoadedMetadata);
            audio.removeEventListener('progress', onProgress);
            audio.removeEventListener('ended', onEnded);
            audio.removeEventListener('waiting', onWaiting);
            audio.removeEventListener('canplay', onCanPlay);
        };
    }, [audioUrl, audioData, setHighlightedWord, setHighlightedVerse]);

    useEffect(() => {
        if (audioId && showAudioPlayer && audioUrl) {
            play();
        }
    }, [audioId, play, showAudioPlayer, audioUrl]);

    return {
        isPlaying,
        currentTime,
        duration,
        buffered,
        isLoading,
        audioRef,
        play,
        pause,
        togglePlayPause,
        handleSeek,
        skipTime,
        stopAudio,
    };
};