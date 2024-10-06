'use client';

import useReadingTime from '@/hooks/use-reading-time';
import { MergedVerse } from '@/lib/types/verses-type';
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
  const [readCount, setReadCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [averageVisibleTime, setAverageVisibleTime] = useState(0);
  const [currentlyReadingVerse, setCurrentlyReadingVerse] = useState<string | null>(null);
  const [averageReadingSpeed, setAverageReadingSpeed] = useState(700); // ms per word
  const { timeSpent, isReading } = useReadingTime();
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
          setReadCount(prevCount => prevCount + 1);
          return true;
        }
      }
      return false;
    },
    [averageReadingSpeed]
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
          setVisibleCount(newVisibleVerses.size);

          let totalTime = 0;
          let count = 0;
          verseVisibilityTimes.current.forEach(info => {
            totalTime += info.totalVisibleTime;
            if (info.lastVisibleTimestamp !== null) {
              totalTime += now - info.lastVisibleTimestamp;
            }
            count++;
          });
          setAverageVisibleTime(count > 0 ? totalTime / count : 0);
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
        let currentVerseKey = currentlyReadingVerse;
        if (!currentVerseKey || !visibleVerses.current.has(currentVerseKey)) {
          currentVerseKey = Array.from(visibleVerses.current)[0] || '';
          setCurrentlyReadingVerse(currentVerseKey);
        }

        const visibilityInfo = verseVisibilityTimes.current.get(currentVerseKey);
        if (visibilityInfo) {
          const isRead = updateReadingProgress(currentVerseKey, visibilityInfo, Date.now());
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="fixed right-0 top-12 m-4 rounded bg-white bg-opacity-80 p-2 text-right font-semibold shadow">
        <div>
          Ayahs Read: {readCount} / {verses.length}
        </div>
        <div>Currently Visible: {visibleCount}</div>
        <div>Average Visible Time: {formatTime(Math.floor(averageVisibleTime / 1000))}</div>
        <div>Currently Reading: {currentlyReadingVerse || 'None'}</div>
        <div>Avg Reading Speed: {Math.round(averageReadingSpeed)} ms/word</div>
        <div>Total Reading Time: {formatTime(timeSpent)}</div>
        <div>Reading Status: {isReading ? 'Active' : 'Paused'}</div>
      </div>
      {children}
    </>
  );
};

export default ReadingProgressTracker;
