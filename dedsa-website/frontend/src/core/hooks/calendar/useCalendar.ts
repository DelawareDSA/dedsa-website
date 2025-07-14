'use client';
import { safeFilter } from '@/utils/safeFilter';

import type {
  CalendarEvent,
  CalendarFilters,
  CalendarViewType,
} from '@/core/types/pages/calendar';
import { useEffect, useMemo, useState } from 'react';

export function useCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewType, setViewType] = useState<CalendarViewType['type']>('month');
  const [filters, setFilters] = useState<CalendarFilters>({
    categories: [],
    committees: [],
    searchTerm: '',
  });

  // ─── REPLACED: Real fetch + normalize instead of mockEvents ─────────────────
  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/events?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`
        );
        if (!res.ok) {
          throw new Error(`Failed to load calendar events: ${res.status}`);
        }
        const payload = await res.json();

        // Merge & normalize WP + Google events into CalendarEvent[]
        const fetchedEvents: CalendarEvent[] = [
          // WordPress events
          ...payload.wp.map((e: any) => ({
            id:        e.id.toString(),
            title:     e.title,
            startDate: e.date,
            location:  e.location  || '',
            isVirtual: e.isVirtual || false,
            link:      undefined,
          })),
          // Google Calendar events
          ...payload.google.map((e: any) => ({
            id:        e.id,
            title:     e.title,
            startDate: e.date,
            location:  e.location || '',
            isVirtual: false,
            link:      e.link,
          })),
        ];

        setEvents(fetchedEvents);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to load events'
        );
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, [currentDate]);
  // ────────────────────────────────────────────────────────────────────────────

  const filteredEvents = useMemo(() => {
    return safeFilter(events, (event) => {
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(event.category || '')
      ) {
        return false;
      }
      if (
        filters.committees.length > 0 &&
        !filters.committees.includes(event.committee || '')
      ) {
        return false;
      }
      if (filters.searchTerm) {
        const s = filters.searchTerm.toLowerCase();
        return Boolean(
          event.title.toLowerCase().includes(s) ||
          (event.description &&
            event.description.toLowerCase().includes(s)) ||
          (event.location &&
            event.location.toLowerCase().includes(s))
        );
      }
      return true;
    });
  }, [events, filters]);

  const viewEvents = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    );

    return safeFilter(filteredEvents, (event) => {
      const d = new Date(event.startDate);
      switch (viewType) {
        case 'month': {
          return d >= startOfMonth && d <= endOfMonth;
        }
        case 'week': {
          const weekStart = new Date(currentDate);
          weekStart.setDate(currentDate.getDate() - currentDate.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          return d >= weekStart && d <= weekEnd;
        }
        case 'day': {
          return d.toDateString() === currentDate.toDateString();
        }
        case 'list': {
          return d >= now;
        }
        default:
          return true;
      }
    });
  }, [filteredEvents, currentDate, viewType]);

  const navigateDate = (dir: 'prev' | 'next') => {
    setCurrentDate((prev) => {
      const next = new Date(prev);
      switch (viewType) {
        case 'month':
          next.setMonth(prev.getMonth() + (dir === 'next' ? 1 : -1));
          break;
        case 'week':
          next.setDate(prev.getDate() + (dir === 'next' ? 7 : -7));
          break;
        case 'day':
          next.setDate(prev.getDate() + (dir === 'next' ? 1 : -1));
          break;
      }
      return next;
    });
  };

  const setToday = () => setCurrentDate(new Date());

  return {
    events:      viewEvents,
    allEvents:   events,
    loading,
    error,
    currentDate,
    viewType,
    filters,
    setViewType,
    setFilters,
    navigateDate,
    setToday,
    setCurrentDate,
  };
}
