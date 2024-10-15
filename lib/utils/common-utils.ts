import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTimeAgo(timestamp: number): {
  value: number;
  unit: 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year';
  isYesterday: boolean;
} {
  const now = Date.now();
  const differenceInSeconds = Math.floor((now - timestamp) / 1000);
  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2592000; // Approximate (30 days)
  const secondsInYear = 31536000; // Approximate (365 days)

  if (differenceInSeconds < secondsInMinute) {
    return { value: differenceInSeconds, unit: 'second', isYesterday: false };
  } else if (differenceInSeconds < secondsInHour) {
    return { value: Math.floor(differenceInSeconds / secondsInMinute), unit: 'minute', isYesterday: false };
  } else if (differenceInSeconds < secondsInDay) {
    return { value: Math.floor(differenceInSeconds / secondsInHour), unit: 'hour', isYesterday: false };
  } else if (differenceInSeconds < 2 * secondsInDay) {
    return { value: 1, unit: 'day', isYesterday: true };
  } else if (differenceInSeconds < secondsInWeek) {
    return { value: Math.floor(differenceInSeconds / secondsInDay), unit: 'day', isYesterday: false };
  } else if (differenceInSeconds < secondsInMonth) {
    return { value: Math.floor(differenceInSeconds / secondsInWeek), unit: 'week', isYesterday: false };
  } else if (differenceInSeconds < secondsInYear) {
    return { value: Math.floor(differenceInSeconds / secondsInMonth), unit: 'month', isYesterday: false };
  } else {
    return { value: Math.floor(differenceInSeconds / secondsInYear), unit: 'year', isYesterday: false };
  }
}


interface ScrollToElementOptions {
  container: HTMLElement;
  element: HTMLElement;
  offset?: number; // Percentage of container height for positioning
}

export function scrollToElement({ container, element, offset = 0.1 }: ScrollToElementOptions): void {
  const containerRect = container.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  const elementTop = elementRect.top - containerRect.top + container.scrollTop;
  const containerHeight = containerRect.height;
  const targetPosition = containerHeight * offset;

  let newScrollTop = elementTop - targetPosition;

  const maxScroll = container.scrollHeight - containerHeight;
  newScrollTop = Math.max(0, Math.min(newScrollTop, maxScroll));

  container.scrollTo({
    top: newScrollTop,
    behavior: 'smooth',
  });
}

export function convertToTitleCase(input: string): string {
  return input.replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\W]+/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const formatRank = (rank: number): string => {
  return rank.toString().padStart(3, '0');
};