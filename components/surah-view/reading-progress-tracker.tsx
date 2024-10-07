'use client';

import useReadingTime from '@/hooks/use-reading-time';
import { MergedVerse } from '@/lib/types/verses-type';
import useLastReadStore from '@/stores/last-read-store';
import useReadingProgressStore from '@/stores/reading-progress-store';
import { useParams } from 'next/navigation';
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface ReadingProgressTrackerProps {
  verses: MergedVerse[];
  children: React.ReactNode;
}

interface VerseVisibilityInfo {
  totalVisibleTime: number;
  lastVisibleTimestamp: number | null;
  wordCount: number;
  isCurrentlyVisible: boolean;
  readPercentage: number;
}

const ReadingProgressTracker: React.FC<ReadingProgressTrackerProps> = ({ verses, children }) => {
  const params = useParams<{ quranSegment: string; segmentId: string }>();
  const { updateLastRead } = useLastReadStore();
  const { updateProgress } = useReadingProgressStore();
  const [currentlyReadingVerse, setCurrentlyReadingVerse] = useState<string | null>(null);
  const [averageReadingSpeed, setAverageReadingSpeed] = useState(500);
  const { isReading } = useReadingTime();
  const readVerses = useRef<Set<string>>(new Set());
  const visibleVerses = useRef<Set<string>>(new Set());
  const verseVisibilityTimes = useRef<Map<string, VerseVisibilityInfo>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastScrollPosition = useRef(0);
  const readingQueue = useRef<string[]>([]);

  const updateReadingProgress = useCallback(
    (verseKey: string, visibilityInfo: VerseVisibilityInfo, currentTime: number) => {
      const elapsedTime = visibilityInfo.isCurrentlyVisible
        ? visibilityInfo.totalVisibleTime +
          (currentTime - (visibilityInfo.lastVisibleTimestamp || currentTime))
        : visibilityInfo.totalVisibleTime;

      const expectedReadTime = visibilityInfo.wordCount * averageReadingSpeed;
      const newReadPercentage = Math.min(100, (elapsedTime / expectedReadTime) * 100);

      if (newReadPercentage > visibilityInfo.readPercentage) {
        visibilityInfo.readPercentage = newReadPercentage;
        if (newReadPercentage >= 90 && !readVerses.current.has(verseKey)) {
          readVerses.current.add(verseKey);

          const today = new Date().toISOString().split('T')[0];
          updateProgress({ date: today, versesRead: 1 });

          return true;
        }
      }
      return false;
    },
    [averageReadingSpeed, updateProgress]
  );

  useEffect(() => {
    const setupObserver = () => {
      observerRef.current = new IntersectionObserver(
        entries => {
          const now = Date.now();
          const newVisibleVerses = new Set(visibleVerses.current);

          entries.forEach(entry => {
            const verseKey = entry.target.getAttribute('data-verse');
            const wordCount = parseInt(entry.target.getAttribute('data-words') || '0', 10) + 1;

            if (verseKey) {
              let visibilityInfo = verseVisibilityTimes.current.get(verseKey);

              if (entry.isIntersecting) {
                newVisibleVerses.add(verseKey);
                if (!visibilityInfo) {
                  visibilityInfo = {
                    totalVisibleTime: 0,
                    lastVisibleTimestamp: now,
                    wordCount: wordCount,
                    isCurrentlyVisible: true,
                    readPercentage: 0,
                  };
                  verseVisibilityTimes.current.set(verseKey, visibilityInfo);
                  if (
                    !readVerses.current.has(verseKey) &&
                    !readingQueue.current.includes(verseKey)
                  ) {
                    readingQueue.current.push(verseKey);
                  }
                } else {
                  visibilityInfo.lastVisibleTimestamp = now;
                  visibilityInfo.isCurrentlyVisible = true;
                }
              } else {
                newVisibleVerses.delete(verseKey);
                if (visibilityInfo && visibilityInfo.lastVisibleTimestamp !== null) {
                  visibilityInfo.totalVisibleTime += now - visibilityInfo.lastVisibleTimestamp;
                  visibilityInfo.lastVisibleTimestamp = null;
                  visibilityInfo.isCurrentlyVisible = false;
                }
              }
            }
          });

          visibleVerses.current = newVisibleVerses;
        },
        { threshold: 0.85 }
      );

      verses.forEach(verse => {
        const element = document.querySelector(`[data-verse="${verse.verse_key}"]`);
        if (element) {
          observerRef.current?.observe(element);
        }
      });
    };

    setTimeout(setupObserver, 100);

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;
      const scrollDirection = currentScrollPosition > lastScrollPosition.current ? 'down' : 'up';
      lastScrollPosition.current = currentScrollPosition;

      if (scrollDirection === 'up') {
        setAverageReadingSpeed(prevSpeed => Math.min(prevSpeed * 1.05, 1000));
      } else {
        setAverageReadingSpeed(prevSpeed => Math.max(prevSpeed * 0.95, 500));
      }
    };

    window.addEventListener('scroll', handleScroll);

    const intervalId = setInterval(() => {
      if (visibleVerses.current.size > 0 && isReading) {
        let newCurrentVerseKey = currentlyReadingVerse;
        if (!newCurrentVerseKey || !visibleVerses.current.has(newCurrentVerseKey)) {
          newCurrentVerseKey = Array.from(visibleVerses.current)[0] || '';
          setCurrentlyReadingVerse(newCurrentVerseKey);
        }

        const visibilityInfo = verseVisibilityTimes.current.get(newCurrentVerseKey);
        if (visibilityInfo) {
          const isRead = updateReadingProgress(newCurrentVerseKey, visibilityInfo, Date.now());
          if (isRead) {
            const nextUnreadVerse = Array.from(visibleVerses.current).find(
              key => !readVerses.current.has(key)
            );
            if (nextUnreadVerse !== currentlyReadingVerse) {
              setCurrentlyReadingVerse(nextUnreadVerse || null);
            }
          }
        }
      } else if (currentlyReadingVerse !== null) {
        setCurrentlyReadingVerse(null);
      }
    }, 1000);

    return () => {
      observerRef.current?.disconnect();
      clearInterval(intervalId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [verses, isReading, updateReadingProgress, currentlyReadingVerse]);

  useEffect(() => {
    if (currentlyReadingVerse) {
      const [surahId, ayahId] = currentlyReadingVerse.split(':').map(Number);
      updateLastRead({
        surah_id: surahId as number,
        ayah_id: ayahId as number,
        timestamp: Date.now(),
        type: params.quranSegment as 'surah' | 'juz' | 'page' | 'hizb' | 'ruku',
        segment_id: Number(params.segmentId),
      });
    }
  }, [currentlyReadingVerse, updateLastRead, params.quranSegment, params.segmentId]);

  return <>{children}</>;
};

export default ReadingProgressTracker;
