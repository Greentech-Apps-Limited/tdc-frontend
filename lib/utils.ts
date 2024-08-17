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

export const getHizbTitle = (id: number): string => {
  const hizbNumber = Math.ceil(id / 4);
  const quarter = (id - 1) % 4;
  const quarterTitles = ['', '1/4', '1/2', '3/4'];
  return quarter === 0 ? `Hizb ${hizbNumber}` : `${quarterTitles[quarter]} Hizb ${hizbNumber}`;
};