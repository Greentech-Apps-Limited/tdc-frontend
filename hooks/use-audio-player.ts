import { useState, useRef, useEffect, useCallback } from 'react';
import useQuranReader from '@/stores/quran-reader-state';
import { BufferedRange } from '@/lib/types/audio';
import { createTimestampMap, findActiveVerse, updateBufferedRanges } from '@/lib/utils/audio-utils';

type AudioPlayerState = {
    isPlaying: boolean;
    currentTime: number;
    duration: number;
    buffered: BufferedRange[];
    isLoading: boolean;
}

type AudioPlayerActions = {
    play: () => void;
    pause: () => void;
    togglePlayPause: () => void;
    handleSeek: (newTime: number) => void;
    skipTime: (seconds: number) => void;
    stopAudio: () => void;
    setTimeByVerse: (verseKey: string) => void;
}


export const useAudioPlayer = (): AudioPlayerState & AudioPlayerActions & { audioRef: React.RefObject<HTMLAudioElement> } => {
    const [state, setState] = useState<AudioPlayerState>({
        isPlaying: false,
        currentTime: 0,
        duration: 0,
        buffered: [],
        isLoading: true,
    });

    const audioRef = useRef<HTMLAudioElement>(null);
    const timestampMap = useRef<Map<string, number>>(new Map());
    const isUserPaused = useRef<boolean>(false);

    const {
        audioUrl,
        audioId,
        showAudioPlayer,
        audioData,
        setHighlightedWord,
        setHighlightedVerse,
        currentVerse,
        setCurrentVerse,
    } = useQuranReader();

    const play = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.play().then(() => {
            setState(prev => ({ ...prev, isPlaying: true }));
            isUserPaused.current = false;
        }).catch((error) => {
            console.error('Playback failed', error);
            setState(prev => ({ ...prev, isPlaying: false }));
        });
    }, []);

    const pause = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        setState(prev => ({ ...prev, isPlaying: false }));
        isUserPaused.current = true;
    }, []);

    const togglePlayPause = useCallback(() => {
        if (state.isPlaying) {
            pause();
        } else {
            play();
        }
    }, [state.isPlaying, pause, play]);

    const stopAudio = useCallback(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
        setState(prev => ({ ...prev, isPlaying: false, currentTime: 0 }));
        isUserPaused.current = true;
        setCurrentVerse(null);
    }, [setCurrentVerse]);

    const handleSeek = useCallback((newTime: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.currentTime = newTime;
        setState(prev => ({ ...prev, currentTime: newTime }));
    }, []);

    const skipTime = useCallback((seconds: number) => {
        const audio = audioRef.current;
        if (!audio) return;

        const newTime = Math.max(0, Math.min(audio.currentTime + seconds, state.duration));
        audio.currentTime = newTime;
    }, [state.duration]);

    const setTimeByVerse = useCallback((verseKey: string) => {
        const audio = audioRef.current;
        if (!audio) return;

        const timestamp = timestampMap.current.get(verseKey);
        if (timestamp !== undefined) {
            audio.currentTime = timestamp;
            setState(prev => ({ ...prev, currentTime: timestamp }));
        }
    }, []);

    useEffect(() => {
        if (audioData?.timestamps) {
            timestampMap.current = createTimestampMap(audioData.timestamps);
        }
    }, [audioData]);

    useEffect(() => {
        if (currentVerse) {
            setTimeByVerse(currentVerse);
        }
    }, [currentVerse, setTimeByVerse]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const onTimeUpdate = () => {
            setState(prev => ({ ...prev, currentTime: audio.currentTime }));
            if (audioData?.timestamps) {
                const activeVerse = findActiveVerse(audio.currentTime, audioData.timestamps);
                if (activeVerse) {
                    activeVerse.segments.forEach(([word, startTime, endTime]) => {
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
            setState(prev => ({ ...prev, duration: audio.duration, isLoading: false }));
        };

        const onProgress = () => {
            setState(prev => ({ ...prev, buffered: updateBufferedRanges(audio) }));
        };

        const onEnded = () => {
            setState(prev => ({ ...prev, isPlaying: false }));
            setCurrentVerse(null);
        };

        const onWaiting = () => setState(prev => ({ ...prev, isLoading: true }));
        const onCanPlay = () => setState(prev => ({ ...prev, isLoading: false }));

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
    }, [audioUrl, audioData, setHighlightedWord, setHighlightedVerse, setCurrentVerse]);

    useEffect(() => {
        if (audioId && showAudioPlayer && audioUrl) {
            const audio = audioRef.current;
            if (audio && !state.isLoading) {
                play();
            }
        }
    }, [audioId, play, showAudioPlayer, audioUrl, state.isLoading]);

    return {
        ...state,
        audioRef,
        play,
        pause,
        togglePlayPause,
        handleSeek,
        skipTime,
        stopAudio,
        setTimeByVerse,
    };
};