// src/hooks/useCalendarEvents.ts
import { useEffect, useState } from 'react';

export interface RawEventsPayload {
  wp: Array<{ id: string; title: string; date: string }>;
  google: Array<{ id: string; title: string; date: string; link: string }>;
}

export interface CalendarEvent {
  id: string;
  summary: string;
  start: { dateTime?: string; date?: string };
  link?: string;
}

/**
 * Fetches events for a given month/year (defaults to today if no date passed),
 * then merges WP and Google events into a unified CalendarEvent[].
 */
export function useCalendarEvents(monthDate?: Date) {
  const [events, setEvents]     = useState<CalendarEvent[]>([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      try {
        const date  = monthDate || new Date();
        const month = date.getMonth() + 1;
        const year  = date.getFullYear();

        const res = await fetch(`/api/events?month=${month}&year=${year}`);
        if (!res.ok) throw new Error(res.statusText);

        const payload: RawEventsPayload = await res.json();

        const normalize = (e: { id: string; title: string; date: string; link?: string }): CalendarEvent => ({
          id:      e.id,
          summary: e.title,
          start:   e.date.includes('T')
                   ? { dateTime: e.date }
                   : { date: e.date },
          link:    e.link,
        });

        setEvents([
          ...payload.wp    .map(normalize),
          ...payload.google.map(normalize),
        ]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [monthDate]);

  return { events, loading, error };
}
