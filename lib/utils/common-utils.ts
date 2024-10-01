import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTimeAgo(timestamp: number): string {
  const now = Date.now();
  const differenceInSeconds = Math.floor((now - timestamp) / 1000);

  const secondsInMinute = 60;
  const secondsInHour = 3600;
  const secondsInDay = 86400;
  const secondsInWeek = 604800;
  const secondsInMonth = 2592000; // Approximate (30 days)
  const secondsInYear = 31536000; // Approximate (365 days)

  if (differenceInSeconds < secondsInMinute) {
    return `${differenceInSeconds}s ago`;
  } else if (differenceInSeconds < secondsInHour) {
    const minutes = Math.floor(differenceInSeconds / secondsInMinute);
    return `${minutes}m ago`;
  } else if (differenceInSeconds < secondsInDay) {
    const hours = Math.floor(differenceInSeconds / secondsInHour);
    return `${hours}h ago`;
  } else if (differenceInSeconds < 2 * secondsInDay) {
    return `yesterday`;
  } else if (differenceInSeconds < secondsInWeek) {
    const days = Math.floor(differenceInSeconds / secondsInDay);
    return `${days}d ago`;
  } else if (differenceInSeconds < secondsInMonth) {
    const weeks = Math.floor(differenceInSeconds / secondsInWeek);
    return `${weeks}w ago`;
  } else if (differenceInSeconds < secondsInYear) {
    const months = Math.floor(differenceInSeconds / secondsInMonth);
    return `${months}mo ago`;
  } else {
    const years = Math.floor(differenceInSeconds / secondsInYear);
    return `${years}y ago`;
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