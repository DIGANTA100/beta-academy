import { Timestamp } from 'firebase/firestore';

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// YouTube URL helpers
export const extractYouTubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
    /youtube\.com\/embed\/([^&\n?#]+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
};

export const getYouTubeEmbedUrl = (url: string): string => {
  const videoId = extractYouTubeId(url);
  if (!videoId) return '';
  return `https://www.youtube.com/embed/${videoId}`;
};

// Date formatters
export const formatDate = (date: Date | Timestamp): string => {
  const d = date instanceof Timestamp ? date.toDate() : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
