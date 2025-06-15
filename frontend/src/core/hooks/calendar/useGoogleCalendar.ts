'use client';

import sampleData from '@/core/content/sample-events.json';
import useSWR from 'swr';

export interface Event {
  title: string;
  date: string;
  location: string;
  isVirtual?: boolean;
  startDate: string;
}

interface GoogleCalendarEvent {
  id: string;
  summary: string;
  description?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
  location?: string;
}

export function useGoogleCalendar(): {
  events: Event[];
  isLoading: boolean;
  isError: boolean;
} {
  const fetcher = async (url: string) => {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json() as Promise<GoogleCalendarEvent[]>;
  };

  const { data, error, isLoading } = useSWR('/api/events', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const eventData =
    data && !error ? data : (sampleData as GoogleCalendarEvent[]);

  const events: Event[] = (eventData || [])
    .filter((e) => e?.summary && (e.start.dateTime || e.start.date))
    .slice(0, 3)
    .map((e) => {
      const iso = e.start.dateTime || e.start.date!;
      const dt = new Date(iso);
      return {
        title: e.summary,
        date: dt.toLocaleString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          ...(e.start.dateTime && {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }),
        }),
        startDate: iso,
        location: e.location || 'Location TBD',
        isVirtual: !!e.location
          ?.toLowerCase()
          .match(/zoom|jitsi|meet|virtual|online/i),
      };
    });

  return {
    events,
    isLoading,
    isError: !!error && !data,
  };
}
