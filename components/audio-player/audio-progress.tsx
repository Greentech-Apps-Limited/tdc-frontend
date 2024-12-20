import React, { useState, useRef, useEffect, useCallback, memo } from 'react';

type AudioProgressProps = {
  currentTime: number;
  duration: number;
  buffered: { start: number; end: number }[];
  onSeek: (value: number) => void;
};

const AudioProgress = ({ currentTime, duration, buffered, onSeek }: AudioProgressProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localProgress, setLocalProgress] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);

  const calculateProgress = useCallback((clientX: number): number => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const position = (clientX - rect.left) / rect.width;
      return Math.max(0, Math.min(position * 100, 100));
    }
    return 0;
  }, []);

  const handleDragStart = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setIsDragging(true);
      setLocalProgress(calculateProgress(e.clientX));
    },
    [calculateProgress]
  );

  const handleDrag = useCallback(
    (e: MouseEvent) => {
      if (isDragging) {
        setLocalProgress(calculateProgress(e.clientX));
      }
    },
    [isDragging, calculateProgress]
  );

  const handleDragEnd = useCallback(() => {
    if (isDragging) {
      setIsDragging(false);
      const newTime = (localProgress / 100) * duration;
      onSeek(newTime);
    }
  }, [isDragging, localProgress, duration, onSeek]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleDragEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleDragEnd);
    };
  }, [isDragging, handleDrag, handleDragEnd]);

  useEffect(() => {
    if (!isDragging) {
      setLocalProgress((currentTime / duration) * 100);
    }
  }, [currentTime, duration, isDragging]);

  const progressPercentage = isDragging ? localProgress : (currentTime / duration) * 100;

  const renderBufferedRanges = useCallback(
    () =>
      buffered.map((range, index) => (
        <div
          key={index}
          className="absolute h-full rounded-full bg-neutral-300"
          style={{
            left: `${(range.start / duration) * 100}%`,
            width: `${((range.end - range.start) / duration) * 100}%`,
          }}
        />
      )),
    [buffered, duration]
  );

  return (
    <div
      className="relative h-2 w-full cursor-pointer"
      ref={progressRef}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progressPercentage}
      aria-label="Audio progress"
    >
      <div className="absolute left-0 top-1/2 h-2 w-full -translate-y-1/2 transform rounded-full bg-neutral-100">
        {renderBufferedRanges()}
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-teal-500"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      <div
        className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 transform cursor-grab rounded-full bg-neutral shadow-md ring-2 ring-teal-500 transition-transform hover:scale-110"
        style={{ left: `${progressPercentage}%` }}
        onMouseDown={handleDragStart}
      />
      <div className="absolute left-0 top-0 h-full w-full" onMouseDown={handleDragStart} />
    </div>
  );
};

export default memo(AudioProgress);
